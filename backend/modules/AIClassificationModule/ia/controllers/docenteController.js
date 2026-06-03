const { generateRoleResponse } = require('../geminiConfig');
const { getApiKeyForRole } = require('../../services/documentChatService');

async function chatDocenteHandler(req, res) {
  const { mensaje, historial } = req.body || {};

  if (!mensaje) return res.status(400).json({ error: 'El mensaje es requerido.' });

  try {
    const apiKey = getApiKeyForRole('docente');
    if (!apiKey) return res.status(500).json({ error: 'API key no configurada para docente.' });

    const respuesta = await generateRoleResponse({
      roleLabel: 'docente',
      apiKey,
      history: historial || [] ,
      message: mensaje,
    });
    return res.json({ respuesta });
  } catch (err) {
    console.error('Error chatDocente:', err);
    return res.status(500).json({ error: 'Error al procesar el chat de docente.', message: err.message, stack: err.stack });
  }
}

module.exports = { chatDocenteHandler };
