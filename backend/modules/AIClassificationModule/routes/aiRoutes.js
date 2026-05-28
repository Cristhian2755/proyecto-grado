const express = require("express");
const { verifyToken } = require("../../../middleware/authMiddleware");
const { chatWithDocument } = require("../services/documentChatService");
const { chatEstudianteHandler } = require("../ia/controllers/estudianteController");
const { chatDocenteHandler } = require("../ia/controllers/docenteController");
const { chatCoordinadorHandler } = require("../ia/controllers/coordinadorController");
const { chatBibliotecaHandler } = require("../ia/controllers/bibliotecaController");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Módulo de IA disponible"
  });
});

router.post("/document-chat", verifyToken, async (req, res) => {
  try {
    const { documentUrl, documentName, question, roleLabel } = req.body || {};

    if (!documentUrl || !question) {
      return res.status(400).json({
        message: "Debes enviar documentUrl y question."
      });
    }

    const result = await chatWithDocument({
      documentUrl,
      documentName: documentName || "documento",
      question,
      roleLabel: roleLabel || "usuario"
    });

    return res.json({
      message: "Consulta procesada correctamente.",
      data: result
    });
  } catch (error) {
    console.error('Error document-chat:', error);
    return res.status(500).json({
      message: error.message || "No se pudo procesar el documento.",
      stack: error.stack
    });
  }
});

// Endpoint unificado por rol: /chat/:rol
router.post('/chat/:rol', verifyToken, async (req, res) => {
  const rol = req.params.rol;

  // Permitir pruebas locales cuando la variable de entorno ALLOW_AI_TESTING=true
  // Si está activada y el token no fue provisto/validado, inyectamos un usuario de prueba.
  if (!req.user && process.env.ALLOW_AI_TESTING === 'true') {
    req.user = { id: 999, rol: 'estudiante' };
  }

  // seguridad por rol: los usuarios solo pueden invocar el bot que corresponda a su rol,
  // excepto cuando el rol solicitado es 'biblioteca' (accesible a todos) o el usuario es administrador.
  const userRole = req.user?.rol;
  if (!userRole) return res.status(401).json({ error: 'Usuario no autenticado' });

  if (rol !== 'biblioteca' && userRole !== rol && userRole !== 'administrador') {
    return res.status(403).json({ error: 'No tienes permisos para usar este chatbot' });
  }

  try {
    switch (rol) {
      case 'estudiante':
        return chatEstudianteHandler(req, res);
      case 'docente':
        return chatDocenteHandler(req, res);
      case 'coordinador':
        return chatCoordinadorHandler(req, res);
      case 'biblioteca':
        return chatBibliotecaHandler(req, res);
      default:
        return res.status(400).json({ error: 'Rol no válido' });
    }
  } catch (err) {
    console.error('Error en /chat/:rol', err);
    return res.status(500).json({ error: 'Error interno del chat.' });
  }
});

module.exports = router;