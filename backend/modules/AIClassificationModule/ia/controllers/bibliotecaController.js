const { generateRoleResponse } = require('../geminiConfig');
const { getApiKeyForRole } = require('../../services/documentChatService');

async function chatBibliotecaHandler(req, res) {
  const { mensaje, historial } = req.body || {};

  if (!mensaje) return res.status(400).json({ error: 'El mensaje es requerido.' });

  try {
    const apiKey = getApiKeyForRole('biblioteca');
    if (!apiKey) return res.status(500).json({ error: 'API key no configurada para biblioteca.' });

    const respuesta = await generateRoleResponse({
      roleLabel: 'biblioteca',
      apiKey,
      history: historial || [],
      message: mensaje,
    });
    return res.json({ respuesta });
  } catch (err) {
    console.error('Error chatBiblioteca:', err);
    return res.status(500).json({ error: 'Error al procesar el chat de biblioteca.', message: err.message, stack: err.stack });
  }
}

module.exports = { chatBibliotecaHandler };
