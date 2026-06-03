const { generateRoleResponse } = require('../geminiConfig');
const { getApiKeyForRole } = require('../../services/documentChatService');

async function chatCoordinadorHandler(req, res) {
  const { mensaje, historial } = req.body || {};

  if (!mensaje) return res.status(400).json({ error: 'El mensaje es requerido.' });

  try {
    const apiKey = getApiKeyForRole('coordinador');
    if (!apiKey) return res.status(500).json({ error: 'API key no configurada para coordinador.' });

    const respuesta = await generateRoleResponse({
      roleLabel: 'coordinador',
      apiKey,
      history: historial || [],
      message: mensaje,
    });
    return res.json({ respuesta });
  } catch (err) {
    console.error('Error chatCoordinador:', err);
    return res.status(500).json({ error: 'Error al procesar el chat de coordinador.', message: err.message, stack: err.stack });
  }
}

module.exports = { chatCoordinadorHandler };
