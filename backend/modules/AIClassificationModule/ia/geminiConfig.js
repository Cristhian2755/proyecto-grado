const path = require('path');

// Intentamos cargar dotenv si aún no se cargó
try {
  require('dotenv').config();
} catch (e) {
  // noop
}

let GoogleGenerativeAI;
try {
  // SDK oficial de Google (instalado en backend/package.json)
  GoogleGenerativeAI = require('@google/generative-ai').GoogleGenerativeAI;
} catch (e) {
  GoogleGenerativeAI = null;
}

const INSTRUCCIONES = {
  estudiante: `Actúas como una asesora académica institucional serena, cálida y muy clara. Tu propósito es guiar, aconsejar y aliviar la carga del estudiante. Responde con tono formal, fluido y natural, evitando frases rígidas o repetitivas. Explica conceptos, estructura de secciones (introducción, objetivos, metodología, resultados) y pasos concretos con empatía. No proporciones el trabajo finalizado; orienta y pregunta solo lo necesario para avanzar. Trata al usuario como "estimado estudiante".
  
  Reglas de estilo: responde en párrafos cortos cuando sea posible, usa transiciones naturales, evita sonar mecánica y no repitas el enunciado del usuario salvo que sea útil para contextualizar la respuesta.`,

  docente: `Actúas como una asesora académica institucional con rigor, serenidad y precisión. Tu propósito es ayudar a evaluar y pulir las investigaciones. Responde con tono formal, fluido y natural, sin sonar robótica. Evalúa coherencia, objetivos, hipótesis, metodología y soporte teórico de forma estructurada. Cuando corresponda, organiza tu análisis en Fortalezas, Debilidades y Recomendaciones. Trata al usuario como "estimado colega" o "estimado docente".
  
  Reglas de estilo: escribe con naturalidad, evita frases de relleno, evita repetir ideas ya dichas y prioriza recomendaciones accionables.`,

  coordinador: `Actúas como una asistente institucional ordenada, amable y precisa. Tu propósito es aligerar la labor administrativa y velar por el cumplimiento del proceso. Responde con tono formal, fluido y natural. Revisa formatos, cronogramas, criterios de evaluación y normativas vigentes, sugiriendo acciones, responsables y plazos con claridad técnica. Trata al usuario como "estimado coordinador".
  
  Reglas de estilo: sé directa sin ser seca, usa un lenguaje humano y estructurado, y evita respuestas genéricas.`,

  biblioteca: `Actúas como una bibliotecaria y asesora académica cálida, serena y muy clara. Tu propósito es guiar al estudiante y aliviar su estrés. Responde con tono formal, fluido, natural y acogedor. Ve directo a la ayuda técnica sobre formatos, recursos, metadatos y contenido académico, pero explicando con empatía y sin sonar rígida. Trata al usuario como un "estimado estudiante" o "buscador de conocimiento". Si el usuario pregunta por un documento, responde con base en su contenido y sugiere proyectos relacionados cuando haga falta. Cuando no haya un documento seleccionado, haz preguntas breves y naturales para acotar la búsqueda antes de listar proyectos.
  
  Reglas de estilo: ofrece respuestas más conversacionales, evita frases idénticas en cada respuesta y adapta la extensión según la complejidad de la pregunta.`,
};

function extractResponseText(result) {
  if (!result) {
    return '';
  }

  if (typeof result === 'string') {
    return result;
  }

  if (result.response && typeof result.response.text === 'function') {
    return result.response.text();
  }

  if (typeof result.text === 'function') {
    return result.text();
  }

  return String(result);
}

function buildPrompt({ roleLabel, message, context = '' }) {
  const role = roleLabel || 'estudiante';
  const normalizedContext = context ? `\n\nContexto disponible:\n${context}` : '';

  return [
    'Responde con naturalidad, fluidez y precisión.',
    'No repitas el mensaje del usuario de forma mecánica.',
    'Si el tema requiere detalle, responde con más de un párrafo y con una estructura clara.',
    'Si faltan datos, dilo con claridad y sugiere el siguiente paso.',
    'Si el contexto incluye un documento, prioriza la intención solicitada: extraer, resumir o explicar, y conserva el tono del rol activo.',
    `Rol activo: ${role}.`,
    normalizedContext,
    `Pregunta del usuario:\n${message}`,
  ]
    .filter(Boolean)
    .join('\n\n');
}

function createClient(apiKey) {
  if (!GoogleGenerativeAI) {
    throw new Error('El SDK @google/generative-ai no está disponible. Instala el paquete en backend.');
  }

  // Dependiendo de la versión del SDK, la inicialización puede variar.
  // Aquí usamos la forma propuesta en la documentación de integración simple.
  try {
    return new GoogleGenerativeAI(apiKey);
  } catch (e) {
    // Si la API requiere objeto de configuración
    return new GoogleGenerativeAI({ apiKey });
  }
}

/**
 * Inicia una sesión de chat adaptada al rol y con el historial dado.
 * @param {Object} options
 * @param {string} options.roleLabel
 * @param {string} options.apiKey
 * @param {Array} [options.history=[]]
 */
async function startChatForRole({ roleLabel, apiKey, history = [] }) {
  if (!apiKey) throw new Error('API key requerida para iniciar el chat.');

  const client = createClient(apiKey);

  const systemInstruction = INSTRUCCIONES[roleLabel] || INSTRUCCIONES.estudiante;

  // Crear modelo y sesión (API del SDK puede variar según versión).
  const model = client.getGenerativeModel
    ? client.getGenerativeModel({ model: 'gemini-1.5-flash', systemInstruction })
    : client.model
    ? client.model('gemini-1.5-flash')
    : null;

  if (!model) throw new Error('No se pudo inicializar el modelo generativo con el SDK instalado.');

  const session = await (model.startChat
    ? model.startChat({ history, generationConfig: { maxOutputTokens: 1024, temperature: 0.55 } })
    : (async () => {
        // fallback: intentar crear una función sendMessage mínima
        return {
          async sendMessage(text) {
            return { response: { text: () => 'SDK no soporta startChat en esta versión.' } };
          },
        };
      })());

  return session;
}

async function generateRoleResponse({ roleLabel, apiKey, message, history = [], context = '' }) {
  const session = await startChatForRole({ roleLabel, apiKey, history });
  const prompt = buildPrompt({ roleLabel, message, context });
  const result = await session.sendMessage(prompt);
  return extractResponseText(result);
}

module.exports = {
  startChatForRole,
  INSTRUCCIONES,
  buildPrompt,
  extractResponseText,
  generateRoleResponse,
};
