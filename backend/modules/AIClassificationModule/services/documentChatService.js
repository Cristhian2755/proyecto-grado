const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const { generateRoleResponse } = require('../ia/geminiConfig');

const DOCS_ROOT = path.resolve(__dirname, '../../../../docs');
const DOCS_BIBLIOTECA_ROOT = path.resolve(DOCS_ROOT, 'ProjectsBiblioteca');
const PYTHON_SCRIPT = path.join(__dirname, 'markitdown_extract.py');
let bibliotecaCatalogCache = null;
let bibliotecaCatalogSignature = '';

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

function resolveDocumentPath(documentUrl, roleLabel = 'estudiante') {
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

  if (pathname.startsWith('ProjectsBiblioteca/')) {
    pathname = pathname.slice('ProjectsBiblioteca/'.length);
  }

  pathname = pathname.replace(/^\/+/, '');
  pathname = decodeURIComponent(pathname);

  const rootFolder = roleLabel === 'biblioteca' ? DOCS_BIBLIOTECA_ROOT : DOCS_ROOT;
  const resolvedPath = path.resolve(rootFolder, pathname);
  if (!resolvedPath.startsWith(rootFolder)) {
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

function extractPdfPages(documentPath) {
  return new Promise((resolve, reject) => {
    const rawBuffer = fs.readFileSync(documentPath);

    pdfParse(rawBuffer, {
      pagerender: async (pageData) => {
        const pageNumber = pageData?.pageInfo?.num || pageData?.pageNumber || 0;
        const textContent = await pageData.getTextContent();
        const pageText = (textContent.items || [])
          .map((item) => item.str)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        return `\n\n[[PAGE ${pageNumber}]]\n${pageText}`;
      },
    })
      .then((result) => {
        const text = result?.text || '';
        const pages = [];
        const pageRegex = /\[\[PAGE\s+(\d+)\]\]\s*([\s\S]*?)(?=\n\n\[\[PAGE\s+\d+\]\]|$)/g;
        let match;

        while ((match = pageRegex.exec(text)) !== null) {
          pages.push({
            pageNumber: Number(match[1]),
            text: match[2].trim(),
          });
        }

        resolve({
          markdown: text.replace(/\n\n\[\[PAGE\s+\d+\]\]/g, '\n\n'),
          pages,
          numPages: result?.numpages || pages.length || null,
        });
      })
      .catch(reject);
  });
}

function extractPageNumber(question) {
  const normalizedQuestion = normalizeText(question);
  const match = normalizedQuestion.match(/\b(?:pagina|page)\s*(\d{1,4})\b/);
  return match ? Number(match[1]) : null;
}

function detectSectionKeyword(question) {
  const normalizedQuestion = normalizeText(question);
  const sectionMap = [
    ['objetivo', 'objetivos'],
    ['metodologia', 'metodologías'],
    ['introduccion', 'introducción'],
    ['resultados', 'conclusiones'],
    ['referencias', 'bibliografia', 'bibliografía'],
    ['alcance', 'limitaciones'],
    ['planteamiento del problema', 'problema'],
  ];

  for (const group of sectionMap) {
    if (group.some((word) => normalizedQuestion.includes(normalizeText(word)))) {
      return group[0];
    }
  }

  return null;
}

function locateSectionParagraphs(markdown, sectionKeyword) {
  if (!sectionKeyword) {
    return [];
  }

  const paragraphs = splitParagraphs(markdown);
  const normalizedSection = normalizeText(sectionKeyword);
  const sectionIndex = paragraphs.findIndex((paragraph) => normalizeText(paragraph).includes(normalizedSection));

  if (sectionIndex < 0) {
    return [];
  }

  return paragraphs.slice(sectionIndex, sectionIndex + 4);
}

function getPageTextByNumber(pages, pageNumber) {
  if (!pageNumber || !Array.isArray(pages)) {
    return null;
  }

  const page = pages.find((entry) => entry.pageNumber === pageNumber);
  return page?.text || null;
}

function buildTargetedResponse({
  question,
  documentName,
  roleLabel,
  pageNumber,
  pageText,
  pageCount,
  sectionKeyword,
  sectionParagraphs,
}) {
  const normalizedQuestion = normalizeText(question);
  const wantsSummary = /(resum|summary|de que trata|sobre que|que contiene|explica|dime de forma resumida)/.test(
    normalizedQuestion,
  );

  if (pageNumber && pageText) {
    const excerpt = pageText.slice(0, 1200);
    return [
      wantsSummary ? `Resumen breve de la parte solicitada: ${excerpt}` : `Contenido principal: ${excerpt}`,
    ].join('\n\n');
  }

  if (pageNumber && !pageText) {
    return [
      'No pude ubicar la parte solicitada en el documento.',
      pageCount ? `El documento parece tener ${pageCount} páginas.` : 'No pude confirmar el total de páginas.',
    ].join('\n\n');
  }

  if (sectionKeyword && sectionParagraphs.length > 0) {
    return [
      wantsSummary
        ? `Resumen breve de la sección ${sectionKeyword}: ${sectionParagraphs.map((paragraph) => stripMarkdown(paragraph)).join(' ')}`
        : sectionParagraphs.map((paragraph) => stripMarkdown(paragraph)).join('\n\n'),
    ].join('\n\n');
  }

  return null;
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

function collectMarkdownBlocks(markdown) {
  const lines = (markdown || '').split(/\r?\n/);
  const blocks = [];
  let current = null;

  for (const line of lines) {
    if (/^#{1,6}\s/.test(line)) {
      if (current) {
        blocks.push(current);
      }

      current = {
        heading: line.trim(),
        text: line.trim(),
      };
      continue;
    }

    if (!current) {
      current = {
        heading: '',
        text: '',
      };
    }

    current.text = current.text ? `${current.text}\n${line}` : line;
  }

  if (current) {
    blocks.push(current);
  }

  return blocks
    .map((block) => ({
      heading: block.heading || '',
      text: (block.text || '').trim(),
    }))
    .filter((block) => block.text);
}

function stripLeadingMarkers(text) {
  if (!text) return '';
  let s = text;
  // Remove common bullet markers
  s = s.replace(/^\s*[-–—]\s*/, '');
  // Remove leading numeric page/line markers like "62 XII. " or "19 VI. " or "43 "
  s = s.replace(/^\s*\d+\s+(?:[IVXLCDM]+\.?\s*)/i, '');
  s = s.replace(/^\s*\d+\s*/i, '');
  // Remove leading roman numerals alone
  s = s.replace(/^\s*[IVXLCDM]+\.?\s+/i, '');
  return s.trim();
}

function scoreBlock(block, keywords) {
  const blockText = normalizeText([block.heading, block.text].filter(Boolean).join(' '));
  let score = 0;

  keywords.forEach((keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) {
      return;
    }

    if (blockText.includes(normalizedKeyword)) {
      score += Math.max(3, normalizedKeyword.length / 2);
    }
  });

  return score;
}

function locateMarkdownSection(markdown, sectionKeyword) {
  if (!sectionKeyword) {
    return null;
  }

  const keywords = Array.isArray(sectionKeyword) ? sectionKeyword : [sectionKeyword];
  const blocks = collectMarkdownBlocks(markdown);
  const rankedBlocks = blocks
    .map((block) => ({ block, score: scoreBlock(block, keywords) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const bestBlock = rankedBlocks[0]?.block || null;
  if (!bestBlock) {
    return null;
  }

  const blockIndex = blocks.findIndex((block) => block === bestBlock);
  const nextBlock = blockIndex >= 0 ? blocks[blockIndex + 1] : null;
  const mergedText = [bestBlock.text, nextBlock && !/^#{1,6}\s/.test(nextBlock.heading) ? nextBlock.text : '']
    .filter(Boolean)
    .join('\n\n')
    .trim();

  return {
    heading: bestBlock.heading,
    text: mergedText || bestBlock.text,
  };
}

function extractSectionByHeading(markdown, sectionKeyword) {
  if (!sectionKeyword) return null;

  const lines = (markdown || '').split(/\r?\n/);
  const normalizedTarget = normalizeText(sectionKeyword);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] || '';
    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (!match) continue;

    const headingText = match[2].trim();
    if (normalizeText(headingText).includes(normalizedTarget)) {
      const level = match[1].length;
      // collect until next heading with level <= current
      const collected = [line];
      let j = i + 1;

      for (; j < lines.length; j++) {
        const ln = lines[j] || '';
        const mh = ln.match(/^(#{1,6})\s+(.*)$/);
        if (mh) {
          const nextLevel = mh[1].length;
          if (nextLevel <= level) break;
        }
        collected.push(ln);
      }

      return collected.join('\n').trim();
    }
  }

  return null;
}

function detectDocumentIntent(question) {
  const normalizedQuestion = normalizeText(question);
  const sectionKeyword = detectSectionKeyword(question);

  const wantsSummary = /\b(resum|summary|síntesis|sintesis|de que trata|sobre que trata|que contiene|contenido general|panorama)\b/.test(
    normalizedQuestion,
  );
  const wantsExplain = /\b(explic|interpreta|desarrolla|detalla|aclara|en palabras sencillas|con tus palabras)\b/.test(
    normalizedQuestion,
  );
  const wantsExact = /\b(literal|textual|copi|tal cual|fragmento|cita|transcribe|exactamente|pagina|page)\b/.test(
    normalizedQuestion,
  );

  if (wantsSummary) {
    return { mode: 'summary', sectionKeyword };
  }

  if (wantsExact) {
    return { mode: 'extract', sectionKeyword };
  }

  if (wantsExplain) {
    return { mode: 'explain', sectionKeyword };
  }

  return { mode: 'answer', sectionKeyword };
}

function buildDocumentContext({
  question,
  documentName,
  roleLabel,
  markdown,
  mode,
  pageNumber = null,
  pageText = null,
  sectionKeyword = null,
  sectionBlock = null,
}) {
  const sourceBlocks = [];

  if (pageNumber && pageText) {
    sourceBlocks.push(pageText);
  }

  if (sectionBlock?.text) {
    sourceBlocks.push(
      [sectionBlock.heading ? `Encabezado detectado: ${sectionBlock.heading}` : '', sectionBlock.text]
        .filter(Boolean)
        .join('\n'),
    );
  } else if (sectionKeyword) {
    const nearbySection = locateMarkdownSection(markdown, sectionKeyword);
    if (nearbySection?.text) {
      sourceBlocks.push(
        [nearbySection.heading ? `Encabezado detectado: ${nearbySection.heading}` : '', nearbySection.text]
          .filter(Boolean)
          .join('\n'),
      );
    }
  }

  if (sourceBlocks.length === 0) {
    sourceBlocks.push((markdown || '').slice(0, 18000));
  }

  const modeInstructions = {
    extract: [
      'Si el usuario pide una parte del documento, entrega solo la parte solicitada con fidelidad y sin inventar contenido.',
      'Si la sección existe, prioriza el texto exacto o un fragmento muy cercano al original.',
      'Si no encuentras la sección, dilo claramente y explica qué sí aparece en el documento.',
    ],
    summary: [
      'Si el usuario pide un resumen, sintetiza el documento en lenguaje natural y claro.',
      'Conserva la jerarquía del Markdown para entender la intención de cada apartado.',
      'Incluye solo las ideas principales, sin citar todo el texto.',
    ],
    explain: [
      'Si el usuario pide explicación, traduce el contenido a palabras sencillas sin perder precisión académica.',
      'Aclara el propósito, la lógica y las implicaciones del fragmento consultado.',
      'Mantén un tono amable, útil y coherente con el rol activo.',
    ],
    answer: [
      'Responde de forma directa y útil con base en el contenido disponible.',
      'Si la pregunta apunta a una sección concreta, enfoca la respuesta en esa sección antes que en el resto del documento.',
      'No inventes información que no esté en el texto.',
    ],
  };

  return [
    `Rol activo: ${roleLabel}`,
    `Documento: ${documentName}`,
    `Modo de respuesta: ${mode}`,
    sectionKeyword ? `Sección objetivo: ${sectionKeyword}` : '',
    'Contexto del documento en Markdown:',
    '---',
    sourceBlocks.join('\n\n---\n\n'),
    '---',
    'Instrucciones de respuesta:',
    '- Mantén la personalidad institucional de la Muñeca de Bloodborne: serena, cálida, elegante y ligeramente mística.',
    '- Responde como un asistente académico de alta calidad, con claridad y naturalidad.',
    ...modeInstructions[mode || 'answer'].map((line) => `- ${line}`),
    '- Si el usuario pide una parte del documento, una página o una sección, responde solo con lo solicitado y con mínima introducción.',
    '- Si el usuario pide resumen o explicación, conserva el sentido del documento y adapta el nivel de detalle a la petición.',
    '- Si hace falta citar, prioriza fragmentos fieles al texto.',
    '',
    `Consulta del usuario:\n${question}`,
  ]
    .filter(Boolean)
    .join('\n');
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

function tokenizeQuestion(question) {
  return normalizeText(question)
    .split(' ')
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function scoreCatalogItem(question, item) {
  const terms = tokenizeQuestion(question);
  if (terms.length === 0) {
    return 0;
  }

  const haystack = normalizeText(
    [item.titulo, item.estudiante_nombre, item.linea_tematica, item.problema, item.documentName]
      .filter(Boolean)
      .join(' '),
  );

  let score = 0;
  terms.forEach((term) => {
    if (haystack.includes(term)) {
      score += Math.max(2, term.length / 2);
    }
  });

  return score;
}

async function findBibliotecaMatches(question, limit = 3) {
  const catalog = await getBibliotecaCatalog();
  const ranked = catalog
    .map((item) => ({ item, score: scoreCatalogItem(question, item) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry);

  if (ranked.length > 0) {
    return ranked;
  }

  return catalog.slice(0, limit);
}

function detectSearchIntent(question) {
  const normalized = normalizeText(question);

  const intentMap = [
    {
      keywords: ['taxi', 'taxi', 'transporte', 'movilidad', 'vehiculo', 'vehículos', 'flota'],
      prompt: '¿Buscas algo relacionado con transporte, gestión de vehículos o control de rutas?',
    },
    {
      keywords: ['red', 'redes', 'telecom', 'telecomunicaciones', 'infraestructura', 'rack'],
      prompt: '¿Te interesa un proyecto de redes, telecomunicaciones o infraestructura tecnológica?',
    },
    {
      keywords: ['software', 'sistema', 'web', 'app', 'aplicacion', 'aplicación', 'plataforma'],
      prompt: '¿Quieres proyectos de desarrollo de software, plataformas web o aplicaciones?',
    },
    {
      keywords: ['educacion', 'educación', 'aula', 'aprendizaje', 'estudiantes'],
      prompt: '¿Prefieres proyectos enfocados en educación, aprendizaje o experiencias académicas?',
    },
    {
      keywords: ['ia', 'inteligencia artificial', 'automatizacion', 'automatización', 'iot', 'datos'],
      prompt: '¿Te gustaría explorar proyectos de IA, automatización, IoT o análisis de datos?',
    },
  ];

  for (const entry of intentMap) {
    if (entry.keywords.some((keyword) => normalized.includes(normalizeText(keyword)))) {
      return entry.prompt;
    }
  }

  return '¿Qué tipo de proyecto te interesa: redes, software, educación, automatización o investigación aplicada?';
}

async function buildSearchGuidanceResponse({ question, roleLabel, suggestedDocuments }) {
  const apiKey = getApiKeyForRole(roleLabel);

  const followUpQuestion = detectSearchIntent(question);

  const guidanceContext = [
    'No hay un documento seleccionado todavía.',
    'Tu tarea es ayudar a la persona a encontrar qué investigar o qué proyecto abrir.',
    'Primero haz una sola pregunta breve y natural para aclarar la búsqueda.',
    'No listes proyectos de inmediato salvo que la intención esté muy clara.',
    'Cuando el usuario responda, entonces podrás orientar mejor o sugerir proyectos.',
    `Pregunta sugerida para iniciar la guía: ${followUpQuestion}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  try {
    return await generateRoleResponse({
      roleLabel,
      apiKey,
      history: [],
      message: question || 'Quiero buscar un proyecto para investigar.',
      context: guidanceContext,
    });
  } catch (error) {
    console.warn('No se pudo generar la guía de búsqueda con Gemini:', error.message || error);

    const intro = 'Claro, puedo ayudarte a buscar con más precisión.';
    const extra = `${followUpQuestion} Si quieres, también puedo orientarte por carrera, tecnología o problema a resolver.`;

    return `${intro} ${extra}`;
  }
}

function buildAnswer({ question, markdown, documentName, roleLabel }) {
  const cleanText = stripMarkdown(markdown);
  const paragraphs = splitParagraphs(markdown);
  const normalizedQuestion = normalizeText(question);
  const intent = detectDocumentIntent(question);
  const words = normalizedQuestion
    .split(' ')
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
  const wantsSummary = intent.mode === 'summary';
  const wantsExplain = intent.mode === 'explain';

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

  if (wantsSummary || wantsExplain) {
    return [
      wantsSummary
        ? `Resumen institucional del documento "${documentName}".`
        : `Explicación clara del documento "${documentName}".`,
      headings.length > 0 ? `Temas detectados: ${headings.join(', ')}.` : '',
      excerpt ? `Inicio del contenido: ${excerpt}${cleanText.length > excerpt.length ? '...' : ''}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');
  }

  if (bestMatches.length > 0) {
    const ROLE_OPENINGS = {
      estudiante: 'Estimado estudiante — encontré lo siguiente en el documento:',
      docente: 'Estimado colega — hallazgos relevantes en el documento:',
      coordinador: 'Estimado coordinador — puntos detectados en el documento:',
      biblioteca: 'He revisado el documento; esto aparece:',
      usuario: 'Esto encontré en el documento:',
    };

    const opening = ROLE_OPENINGS[roleLabel] || ROLE_OPENINGS.usuario;

    return [
      opening,
      ...bestMatches.map((match, idx) => {
        const cleaned = stripLeadingMarkers(stripMarkdown(match));
        return `${idx + 1}. "${cleaned}"`;
      }),
    ].join('\n\n');
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
  if (!documentUrl) {
    const rankedMatches = await findBibliotecaMatches(question, 3);
    const bestMatch = rankedMatches[0] || null;
    const hasStrongMatch = bestMatch && bestMatch.score >= 4;
    const matchedDocuments = hasStrongMatch ? [bestMatch.item] : [];
    const answer = await buildSearchGuidanceResponse({
      question,
      roleLabel,
      suggestedDocuments: matchedDocuments,
    });

    return {
      documentName: documentName || null,
      markdown: '',
      markdownPath: null,
      suggestions: hasStrongMatch ? ['Encontré un proyecto que podría servirte.'] : [],
      suggestedDocuments: matchedDocuments,
      answer,
    };
  }

  const resolvedPath = resolveDocumentPath(documentUrl, roleLabel);
  const pageNumber = extractPageNumber(question);
  const intent = detectDocumentIntent(question);
  const sectionKeyword = intent.sectionKeyword;
  const isPdf = path.extname(resolvedPath).toLowerCase() === '.pdf';
  const pageData = isPdf ? await extractPdfPages(resolvedPath) : null;
  const markdown = pageData?.markdown || (await extractMarkdown(resolvedPath));

  if (!markdown) {
    return {
      documentName,
      markdown: '',
      answer: `No fue posible extraer contenido de "${documentName}".`,
      suggestions: [],
      markdownPath: null,
    };
  }

  const pageText = pageNumber ? getPageTextByNumber(pageData?.pages || [], pageNumber) : null;
  const sectionBlock = locateMarkdownSection(markdown, sectionKeyword);

  if (intent.mode === 'extract' && (pageText || sectionBlock)) {
    const markdownPath = await saveMarkdownFile(documentName, markdown);
    const sourceText = pageText || extractSectionByHeading(markdown, sectionKeyword) || sectionBlock?.text || '';

    // If we found an exact markdown section, return it preserving formatting
    if (pageText) {
      return {
        documentName,
        markdown,
        markdownPath,
        suggestions: generateSuggestions(markdown),
        suggestedDocuments: [],
        answer: stripLeadingMarkers(stripMarkdown(pageText)),
      };
    }

    if (sourceText) {
      return {
        documentName,
        markdown,
        markdownPath,
        suggestions: generateSuggestions(markdown),
        suggestedDocuments: [],
        // entregamos la sección en formato Markdown para mantener encabezados, listas y citas
        answer: sourceText,
      };
    }

    return {
      documentName,
      markdown,
      markdownPath,
      suggestions: generateSuggestions(markdown),
      suggestedDocuments: [],
      answer: 'No pude extraer exactamente esa sección del documento.',
    };
  }

  const apiKey = getApiKeyForRole(roleLabel);
  const documentContext = buildDocumentContext({
    question,
    documentName,
    roleLabel,
    markdown,
    mode: intent.mode,
    pageNumber,
    pageText,
    sectionKeyword,
    sectionBlock,
  });

  let answer = '';

  try {
    answer = await generateRoleResponse({
      roleLabel,
      apiKey,
      history: [],
      message: question,
      context: documentContext,
    });
  } catch (error) {
    console.warn('Gemini no respondió en chatWithDocument, usando respuesta de respaldo:', error.message || error);
    answer = buildAnswer({ question, markdown, documentName, roleLabel });
  }

  const suggestions = generateSuggestions(markdown);
  const markdownPath = await saveMarkdownFile(documentName, markdown);

  return {
    documentName,
    markdown,
    markdownPath,
    suggestions,
    suggestedDocuments: [],
    answer,
  };
}

function collectPdfFiles(dirPath, accumulator = []) {
  if (!fs.existsSync(dirPath)) {
    return accumulator;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      collectPdfFiles(fullPath, accumulator);
      return;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
      accumulator.push(fullPath);
    }
  });

  return accumulator;
}

function buildBibliotecaSignature(pdfFiles) {
  return pdfFiles
    .map((filePath) => {
      const stat = fs.statSync(filePath);
      return `${filePath}:${stat.size}:${stat.mtimeMs}`;
    })
    .join('|');
}

function normalizeWhitespace(text) {
  return (text || '').replace(/\s+/g, ' ').trim();
}

function cleanCatalogLine(line) {
  return (line || '')
    .replace(/^\d+\s*\|?\s*/, '')
    .replace(/^\|\s*/, '')
    .replace(/\s*\|\s*$/, '')
    .trim();
}

function looksLikeAuthorLine(line) {
  return /^(autor|autora|presentado por|elaborado por|desarrollado por|por)\b/i.test(line);
}

function looksLikeTitleNoise(line) {
  return /^(modalidad|director|codirector|instituto|facultad|programa|trabajo de grado|informe final|resumen|abstract|tabla de contenido|contenido|siglas)/i.test(
    line,
  );
}

function isLikelyPersonNameLine(line) {
  const words = line.split(/\s+/).filter(Boolean);

  if (words.length < 2 || words.length > 8) {
    return false;
  }

  return words.every((word) => /^[A-ZÁÉÍÓÚÑ](?:[a-záéíóúñ]+|[A-ZÁÉÍÓÚÑ]+)?(?:[.'-][A-ZÁÉÍÓÚÑa-záéíóúñ]+)?$/.test(word));
}

function inferDocumentMetadata(text, fileName) {
  const cleanText = normalizeWhitespace(text);
  const lines = (text || '')
    .split(/\r?\n/)
    .map((line) => cleanCatalogLine(line.trim()))
    .filter(Boolean)
    .filter((line) => line.length > 2);

  const fallbackTitle = fileName.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim();
  const titleLines = [];

  for (const line of lines) {
    if (looksLikeAuthorLine(line) || looksLikeTitleNoise(line)) {
      break;
    }

    if (line.length > 6) {
      titleLines.push(line);
    }

    if (titleLines.length >= 3) {
      break;
    }
  }

  const titleCandidate = titleLines.length > 0 ? titleLines.join(' ') : fallbackTitle;

  let authorCandidate = '';
  const authorLine = lines.find((line) => looksLikeAuthorLine(line));
  const authorPatternMatches = [
    /(?:ESTUDIANTE|AUTOR(?:A)?|PRESENTADO POR|ELABORADO POR|DESARROLLADO POR)[:\-\s]+(.+?)(?=\s+(?:CÓDIGO|CODIGO|INSTITUTO|FACULTAD|PROGRAMA|DIRECTOR|CODIRECTOR|MODALIDAD|TRABAJO|INFORME|$))/i,
    /(?:ESTUDIANTE|AUTOR(?:A)?|PRESENTADO POR|ELABORADO POR|DESARROLLADO POR)\s+(.+?)(?=\s+(?:CÓDIGO|CODIGO|INSTITUTO|FACULTAD|PROGRAMA|DIRECTOR|CODIRECTOR|MODALIDAD|TRABAJO|INFORME|$))/i,
  ];

  const explicitAuthor =
    (authorLine &&
      authorPatternMatches
        .map((pattern) => authorLine.match(pattern)?.[1])
        .find(Boolean)) ||
    '';

  if (explicitAuthor) {
    authorCandidate = explicitAuthor
      .replace(/^(autor|autora|presentado por|elaborado por|desarrollado por|por)[:\-\s]*/i, '')
      .trim();
  } else {
    const titleIndex = lines.findIndex((line) => titleLines.includes(line));
    const nearbyLines = titleIndex >= 0 ? lines.slice(titleIndex + titleLines.length, titleIndex + titleLines.length + 5) : lines.slice(1, 6);
    const nameCandidate = nearbyLines.find((line) => {
      return (
        isLikelyPersonNameLine(line) &&
        !looksLikeTitleNoise(line) &&
        !/\d/.test(line)
      );
    });
    authorCandidate = nameCandidate || 'Desconocido';
  }

  return {
    titulo: titleCandidate || fallbackTitle,
    autor: authorCandidate || 'Desconocido',
    resumen: cleanText.slice(0, 360),
  };
}

async function getBibliotecaCatalog() {
  const pdfFiles = collectPdfFiles(DOCS_BIBLIOTECA_ROOT);
  const signature = buildBibliotecaSignature(pdfFiles);

  if (bibliotecaCatalogCache && bibliotecaCatalogSignature === signature) {
    return bibliotecaCatalogCache;
  }

  const documents = await Promise.all(
    pdfFiles.map(async (filePath, index) => {
      const fileName = path.basename(filePath);
      let text = '';

      try {
        const rawBuffer = fs.readFileSync(filePath);
        const parsed = await pdfParse(rawBuffer);
        text = parsed.text || '';
      } catch (_error) {
        text = '';
      }

      const metadata = inferDocumentMetadata(text, fileName);
      const stat = fs.statSync(filePath);

      return {
        id: index + 1,
        titulo: metadata.titulo,
        estudiante_nombre: metadata.autor,
        linea_tematica: 'Proyecto aprobado',
        estado: 'APROBADO',
        problema: metadata.resumen || 'Documento aprobado disponible para consulta.',
        documentName: fileName,
        documentUrl: `/docs/ProjectsBiblioteca/${encodeURIComponent(fileName)}`,
        fecha_revision: stat.mtime.toISOString(),
      };
    }),
  );

  documents.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));

  bibliotecaCatalogCache = documents.map((document, position) => ({
    ...document,
    id: position + 1,
  }));

  bibliotecaCatalogSignature = signature;

  return bibliotecaCatalogCache;
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
  getBibliotecaCatalog,
  resolveDocumentPath,
  extractMarkdown,
  buildAnswer,
  getApiKeyForRole,
  generateSuggestions,
  saveMarkdownFile,
};