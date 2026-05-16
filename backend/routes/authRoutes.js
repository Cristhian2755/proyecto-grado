const express = require("express");
const router = express.Router();

const { registerUser, loginUser, listUsers, listCarreras, createUser, updateUser, deleteUser, getUserSubroles, setUserSubroles, getUserAssignments, assignStudentToDocente, removeUserAssignment } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

// POST /api/auth/register - Registrar nuevo usuario
router.post("/register", registerUser);

// POST /api/auth/login - Iniciar sesión
router.post("/login", loginUser);

// CRUD endpoints para usuarios (requieren autenticación y rol administrador/coordinador)
// GET /api/auth/users - Listar usuarios
router.get("/users", verifyToken, checkRole("administrador", "coordinador"), listUsers);

// GET /api/auth/carreras - Listar programas disponibles
router.get("/carreras", verifyToken, checkRole("administrador", "coordinador"), listCarreras);

// POST /api/auth/users - Crear usuario
router.post("/users", verifyToken, checkRole("administrador", "coordinador"), createUser);

// PUT /api/auth/users/:id - Actualizar usuario
router.put("/users/:id", verifyToken, checkRole("administrador", "coordinador"), updateUser);

// DELETE /api/auth/users/:id - Eliminar usuario
router.delete("/users/:id", verifyToken, checkRole("administrador", "coordinador"), deleteUser);

// GET /api/auth/users/:id/subroles - Obtener subroles de un docente
router.get("/users/:id/subroles", verifyToken, checkRole("administrador", "coordinador"), getUserSubroles);

// PUT /api/auth/users/:id/subroles - Asignar subroles a un docente
router.put("/users/:id/subroles", verifyToken, checkRole("administrador", "coordinador"), setUserSubroles);

// GET /api/auth/users/:id/assignments - Obtener asignaciones de estudiantes para un docente
router.get("/users/:id/assignments", verifyToken, checkRole("administrador", "coordinador"), getUserAssignments);

// POST /api/auth/users/:id/assignments - Asignar o actualizar estudiante a docente
router.post("/users/:id/assignments", verifyToken, checkRole("administrador", "coordinador"), assignStudentToDocente);

// DELETE /api/auth/users/:id/assignments/:studentId - Eliminar asignación de estudiante para docente
router.delete("/users/:id/assignments/:studentId", verifyToken, checkRole("administrador", "coordinador"), removeUserAssignment);

module.exports = router;