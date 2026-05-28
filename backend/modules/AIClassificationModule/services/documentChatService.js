const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.resolve(__dirname, '../../../../docs');
const PYTHON_SCRIPT = path.join(__dirname, 'markitdown_extract.py');

// Leer variables de entorno (si no se cargaron ya por server.js)
try {
  require('dotenv').config();
} catch (e) {
  // noop
}

// Mapeo de claves por rol. Usar `getApiKeyForRole(roleLabel)` para obtener la clave.
const ROLE_KEYS = {
  estudiante: process.env.APIKEY_ESTUDIANTE,
  docente: process.env.APIKEY_DOCENTE,
  coordinador: process.env.APIKEY_COORDINADOR,
  biblioteca: process.env.APIKEY_BIBLIOTECA,
};

function getApiKeyForRole(roleLabel) {
  if (!roleLabel) return process.env.APIKEY_DEFAULT || null;
  const key = ROLE_KEYS[roleLabel] || process.env.APIKEY_DEFAULT || null;
  return key;
}

const STOP_WORDS = new Set([
  'de',
  'la',
  'el',
  'y',
  'o',
  'en',
  'un',
  'una',
  'unos',
  'unas',
  'para',
  'por',
  'con',
  'sin',
  'del',
  'al',
  'que',
  'se',
  'su',
  'sus',
  'es',
  'son',
  'como',
  'qué',
  'que',
  'cuál',
  'cual',
  'dime',
  'mostrar',
  'resume',
  'resumen',
]);

function resolveDocumentPath(documentUrl) {
  if (!documentUrl || typeof documentUrl !== 'string') {
    throw new Error('Debes enviar una ruta de documento válida.');
  }

  let pathname = documentUrl.trim();

  try {
    const parsed = new URL(pathname, 'http://localhost');
    pathname = parsed.pathname;
  } catch (_error) {
    // Usa el valor recibido tal como está si no es una URL completa.
  }

  if (pathname.startsWith('/docs/')) {
    pathname = pathname.slice('/docs/'.length);
  }

  pathname = pathname.replace(/^\/+/, '');

  const resolvedPath = path.resolve(DOCS_ROOT, pathname);
  if (!resolvedPath.startsWith(DOCS_ROOT)) {
    throw new Error('La ruta del documento no es válida.');
  }

  if (!fs.existsSync(resolvedPath)) {
    throw new Error('No se encontró el archivo del documento.');
  }

  return resolvedPath;
}

function extractMarkdown(documentPath) {
  return new Promise((resolve, reject) => {
    const venvPython = path.resolve(__dirname, '../../../.venv/bin/python3');
    const pythonCmd = fs.existsSync(venvPython) ? venvPython : 'python3';

    execFile(
      pythonCmd,
      [PYTHON_SCRIPT, documentPath],
      {
        timeout: 30000,
        maxBuffer: 10 * 1024 * 1024,
      },
      (error, stdout, stderr) => {
        if (error) {
          const message = stderr?.toString().trim() || error.message;
          reject(new Error(message));
          return;
        }

        resolve(stdout.toString().trim());
      },
    );
  });
}

function normalizeText(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitParagraphs(markdown) {
  return markdown
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function scoreParagraph(paragraph, terms) {
  const normalizedParagraph = normalizeText(paragraph);
  let score = 0;

  terms.forEach((term) => {
    if (!term) {
      return;
    }

    if (normalizedParagraph.includes(term)) {
      score += Math.max(2, term.length / 2);
    }
  });

  return score;
}

function buildAnswer({ question, markdown, documentName, roleLabel }) {
  const cleanText = stripMarkdown(markdown);
  const paragraphs = splitParagraphs(markdown);
  const normalizedQuestion = normalizeText(question);
  const words = normalizedQuestion
    .split(' ')
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
  const wantsSummary = /(resum|summary|de que trata|sobre que|que contiene|explica)/.test(
    normalizedQuestion,
  );

  const bestMatches = paragraphs
    .map((paragraph) => ({ paragraph, score: scoreParagraph(paragraph, words) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => stripMarkdown(item.paragraph).slice(0, 280));

  const excerpt = cleanText.slice(0, 500);
  const headings = paragraphs
    .filter((paragraph) => /^#{1,6}\s/.test(paragraph))
    .slice(0, 5)
    .map((heading) => heading.replace(/^#{1,6}\s*/, '').trim());

  if (wantsSummary) {
    return [
      `Resumen institucional del documento "${documentName}" para ${roleLabel}.`,
      headings.length > 0 ? `Temas detectados: ${headings.join(', ')}.` : '',
      excerpt ? `Inicio del contenido: ${excerpt}${cleanText.length > excerpt.length ? '...' : ''}` : '',
      'Si requiere un análisis adicional, indique la sección o el criterio que desea revisar.',
    ]
      .filter(Boolean)
      .join('\n\n');
  }

  if (bestMatches.length > 0) {
    return [
      `Se identificaron estos fragmentos relevantes en "${documentName}":`,
      ...bestMatches.map((match) => `- ${match}`),
      '',
      'Indique una sección o palabra clave adicional para ampliar la revisión.',
    ].join('\n');
  }

  return [
    `No se encontraron coincidencias exactas para la consulta en "${documentName}".`,
    excerpt
      ? `Vista general del documento: ${excerpt}${cleanText.length > excerpt.length ? '...' : ''}`
      : 'El archivo se pudo convertir, pero no quedó texto útil para mostrar.',
    '',
    'Se recomienda consultar con palabras clave del título, objetivos, conclusiones o apartados específicos.',
  ].join('\n\n');
}

async function chatWithDocument({ documentUrl, documentName, question, roleLabel }) {
  const resolvedPath = resolveDocumentPath(documentUrl);
  const markdown = await extractMarkdown(resolvedPath);

  if (!markdown) {
    return {
      documentName,
      markdown: '',
      answer: `No fue posible extraer contenido de "${documentName}".`,
      suggestions: [],
      markdownPath: null,
    };
  }

  const answer = buildAnswer({ question, markdown, documentName, roleLabel });
  const suggestions = generateSuggestions(markdown);
  const markdownPath = await saveMarkdownFile(documentName, markdown);

  return {
    documentName,
    markdown,
    markdownPath,
    suggestions,
    answer,
  };
}

function generateSuggestions(markdown) {
  if (!markdown) return [];
  const paragraphs = splitParagraphs(markdown);
  const headings = paragraphs.filter((p) => /^#{1,6}\s/.test(p)).slice(0, 8);
  const suggestions = new Set();

  // Añadir sugerencias generales
  suggestions.add('Resume el documento en 3-5 líneas');
  suggestions.add('Extrae los objetivos y conclusiones');
  suggestions.add('Busca las recomendaciones o futuras líneas de trabajo');

  // Añadir sugerencias por encabezado
  headings.forEach((h) => {
    const title = h.replace(/^#{1,6}\s*/, '').trim();
    if (title) {
      suggestions.add(`Explica brevemente la sección: ${title}`);
      suggestions.add(`¿Qué aportes menciona la sección ${title}?`);
    }
  });

  return Array.from(suggestions).slice(0, 10);
}

async function saveMarkdownFile(documentName, markdown) {
  try {
    const tempDir = path.resolve(__dirname, '../../../../backend/temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    const safeName = documentName.replace(/[^a-z0-9A-Z._-]/g, '_');
    const outPath = path.join(tempDir, `${safeName}.md`);
    fs.writeFileSync(outPath, markdown || '', 'utf8');
    return outPath;
  } catch (e) {
    console.warn('No se pudo guardar el markdown:', e.message || e);
    return null;
  }
}

module.exports = {
  chatWithDocument,
  resolveDocumentPath,
  extractMarkdown,
  buildAnswer,
  getApiKeyForRole,
  generateSuggestions,
  saveMarkdownFile,
};