const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

// Rutas públicas (requieren autenticación)
router.get("/", verifyToken, projectController.getProjects);
router.get("/my-projects", verifyToken, projectController.getMyProjects);
router.get("/:id", verifyToken, projectController.getProjectById);

// Rutas privadas (solo estudiantes pueden crear)
router.post("/", verifyToken, checkRole("Estudiante"), projectController.createProject);
router.put("/:id", verifyToken, projectController.updateProject);
router.delete("/:id", verifyToken, projectController.deleteProject);

module.exports = router;