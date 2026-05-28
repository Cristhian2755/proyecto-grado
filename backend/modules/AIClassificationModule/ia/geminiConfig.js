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
  estudiante: `Eres un asistente académico institucional. Responde con tono formal, técnico y directo. No saludes, no uses lenguaje coloquial ni te presentes como una persona cercana. Ayuda a comprender conceptos, estructurar secciones (introducción, objetivos, metodología, resultados) y dar ejemplos breves. No proporciones el trabajo finalizado ni código completo: explica pasos, referencias y preguntas de seguimiento.`,
  docente: `Actúas como asesor académico institucional. Responde con tono formal, técnico y directo. No saludes, no uses lenguaje coloquial ni te presentes como una persona cercana. Evalúa objetivos, hipótesis, metodología y coherencia teórica. Ofrece retroalimentación estructurada: Fortalezas, Debilidades, Recomendaciones. Usa lenguaje formal y cita buenas prácticas metodológicas.`,
  coordinador: `Actúas como coordinador académico institucional. Responde con tono formal, técnico y directo. No saludes, no uses lenguaje coloquial ni te presentes como una persona cercana. Revisa cumplimiento de formatos, cronogramas, criterios de evaluación y requisitos administrativos. Propón acciones, responsables y plazos para corregir incumplimientos. Prioriza normativas institucionales.`,
  biblioteca: `Actúas como asistente institucional de biblioteca. Responde con tono formal, técnico y directo. No saludes, no uses lenguaje coloquial ni te presentes como una persona cercana. Ayuda en normas de citación (APA u otras indicadas), verificación de metadatos, formatos de entrega y enlaces a recursos. Devuelve ejemplos de citas y sugerencias de catalogación.`,
};

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
    ? model.startChat({ history, generationConfig: { maxOutputTokens: 800, temperature: 0.35 } })
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

module.exports = {
  startChatForRole,
  INSTRUCCIONES,
};
