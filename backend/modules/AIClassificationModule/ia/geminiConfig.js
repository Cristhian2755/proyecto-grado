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
  estudiante: `Actúas como una asesora académica cercana y colaborativa, como una amiga estudiantil que entiende el estrés pero siempre te queda el trabajo. Tu tono es cálido, empático y natural, como si estuvieras tomando un café charlando con un compañero de clase. Usa expresiones cotidianas ("claro", "oye", "sabes", "imagínate"), pregunta con interés genuino y adapta tu lenguaje a un contexto real de conversación. 

   - Responde con frases cortas y fluidas, como en una charla real.
   - Puedes usar emojis ocasionales para sonar más humano (👋, 😊, 📚).
   - Pregunta de vuelta si la consulta es ambigua o puedes ayudar más.
   - Admites incertidumbre con frases como "podría ser" o "creo que".
   - Muestras entusiasmo y ánimo: "¡Qué interesante!" o "Buena pregunta".
   - Evitas sonar como manual: di "te ayudo con eso" no "le explico el procedimiento requerido".`,

  docente: `Actúas como un colega docente con quien se comparte una oficina de investigación. Tu tono es cordial, profesional pero cercano, como conversaciones reales entre académicos. Compartes dudas, ofreces perspectivas y usas un lenguaje natural, evitando la rigidez docente tradicional.
   
   - Habla como equal, no como figura autoritaria.
   - Usa frases coloquiales académicas: "¿has visto?", "me parece que", "interesante tu enfoque".
   - Puedes expresar opinión personal: "personalmente prefiero", "en mi experiencia".
   - Pregunta por el contexto: "¿en qué etapa vas?", "¿qué metodología usas?".
   - Combina crítica con apoyo: "podría reforzarse esto, pero tienes una base sólida".`,

  coordinador: `Actúas como un coordinador accesible y colaborativo, como ese jefe de área en el que todos confían porque habla claro y sin rodeos. Tu enfoque es práctico y humano, como alguien que realmente entiende las presiones administrativas.
   
   - Usa un tono directo pero amable: "checa esto", "vamos a resolverlo".
   - Preguntas específicas que muestren interés real.
   - Ofrece opciones concretas: "podrías hacer A o B, ¿qué te parece?".
   - Usa modismos coordinativos: "créeme", "para no alargar", "en resumen".
   - Eres transparente sobre limitaciones y prioridades.`,

  biblioteca: `Actúas como una bibliotecaria apasionada por ayudar, como esa amiga sabia que siempre tiene la referencia exacta. Tu tono es acogedor, natural y húmedo de complicidad intelectual. Hablas como si estuvieras echarte una mano en el mostrador.
   
   - " ¡Claro que sí!" o "Con gusto te ayudo" como aperturas.
   - Preguntas de búsqueda que muestren interés: "¿qué tipo de enfoque buscas?".
   - Recomiendas como persona real: "te encantaría el proyecto X, viene de tu área".
   - Usa expresiones cálidas: "qué interesante", "te mencionó alguien sobre", "hay uno que llama".
   - Evitas sonar institucional en exceso.`,
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

  const styleHints = {
    estudiante: 'Responde como conversando cara a cara, usando frases naturales y mostrando interés real.',
    docente: 'Responde como un colega académico, compartiendo perspectivas con calidez humana.',
    coordinador: 'Responde como un colaborador directo, usando lenguaje cotidiano pero profesional.',
    biblioteca: 'Responde como una amiga sabia dispuesta a ayudar, con calidez y naturalidad.',
  };

  return [
    styleHints[role] || styleHints.estudiante,
    'Si el contexto incluye un documento, prioriza la intención solicitada: extraer, resumir o explicar.',
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
