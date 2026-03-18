const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");

const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");


// Obtener todos los proyectos (usuarios autenticados)
router.get(
  "/",
  verifyToken,
  projectController.getProjects
);


// Crear proyecto (solo estudiantes)
router.post(
  "/",
  verifyToken,
  checkRole("estudiante"),
  projectController.createProject
);


// Revisar proyecto (solo asesores)
router.put(
  "/review/:id",
  verifyToken,
  checkRole("asesor"),
  projectController.reviewProject
);


module.exports = router;