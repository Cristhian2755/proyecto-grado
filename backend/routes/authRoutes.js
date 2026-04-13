const express = require("express");
const router = express.Router();

const { registerUser, loginUser, listUsers, createUser, updateUser, deleteUser, getUserSubroles, setUserSubroles } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

// POST /api/auth/register - Registrar nuevo usuario
router.post("/register", registerUser);

// POST /api/auth/login - Iniciar sesión
router.post("/login", loginUser);

// CRUD endpoints para usuarios (requieren autenticación y rol administrador/coordinador)
// GET /api/auth/users - Listar usuarios
router.get("/users", verifyToken, checkRole("administrador", "coordinador"), listUsers);

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

module.exports = router;