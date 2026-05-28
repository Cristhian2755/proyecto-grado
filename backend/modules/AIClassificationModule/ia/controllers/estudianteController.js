const { startChatForRole } = require('../geminiConfig');
const { getApiKeyForRole } = require('../../services/documentChatService');

async function chatEstudianteHandler(req, res) {
  const { mensaje, historial } = req.body || {};

  if (!mensaje) return res.status(400).json({ error: 'El mensaje es requerido.' });

  try {
    const apiKey = getApiKeyForRole('estudiante');
    if (!apiKey) return res.status(500).json({ error: 'API key no configurada para estudiante.' });

    const session = await startChatForRole({ roleLabel: 'estudiante', apiKey, history: historial || [] });
    const result = await session.sendMessage ? await session.sendMessage(mensaje) : { response: { text: () => 'SDK no soporta sendMessage en esta versión.' } };

    const respuesta = result && result.response && typeof result.response.text === 'function' ? result.response.text() : String(result);
    return res.json({ respuesta });
  } catch (err) {
    console.error('Error chatEstudiante:', err);
    return res.status(500).json({ error: 'Error al procesar el chat de estudiante.', message: err.message, stack: err.stack });
  }
}

module.exports = { chatEstudianteHandler };
