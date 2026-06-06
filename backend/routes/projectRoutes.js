const express = require('express');
const router = express.Router();

const { listProjects, getProjectById, getMyAssignedProjects } = require('../controllers/projectController');
const { importBiblioteca, deleteBibliotecaFile } = require('../controllers/projectController');
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

// GET /api/projects - listar proyectos (admin/coordinador)
router.get('/', verifyToken, checkRole('administrador', 'coordinador'), listProjects);

// GET /api/projects/my-assigned-projects - listar estudiantes asignados al docente
router.get('/my-assigned-projects', verifyToken, getMyAssignedProjects);

// GET /api/projects/:id - obtener proyecto por id (admin/coordinador)
router.get('/:id', verifyToken, checkRole('administrador', 'coordinador'), getProjectById);

// POST /api/projects/import-biblioteca - importar archivo de biblioteca como proyecto
router.post('/import-biblioteca', verifyToken, checkRole('administrador', 'coordinador'), importBiblioteca);

// DELETE /api/projects/biblioteca/:fileName - eliminar archivo de biblioteca
router.delete('/biblioteca/:fileName', verifyToken, checkRole('administrador', 'coordinador'), deleteBibliotecaFile);

module.exports = router;
