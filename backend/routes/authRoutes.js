const express = require("express");
const router = express.Router();

const { registerUser, loginUser, listUsers, createUser, updateUser, deleteUser } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { checkRole } = require("../middleware/roleMiddleware");

// POST /api/auth/register - Registrar nuevo usuario
router.post("/register", registerUser);

// POST /api/auth/login - Iniciar sesión
router.post("/login", loginUser);

// CRUD endpoints para usuarios (requieren autenticación y rol administrador)
// GET /api/auth/users - Listar usuarios
router.get("/users", verifyToken, checkRole("administrador", "coordinador"), listUsers);

// POST /api/auth/users - Crear usuario
router.post("/users", verifyToken, checkRole("administrador", "coordinador"), createUser);

// PUT /api/auth/users/:id - Actualizar usuario
router.put("/users/:id", verifyToken, checkRole("administrador", "coordinador"), updateUser);

// DELETE /api/auth/users/:id - Eliminar usuario
router.delete("/users/:id", verifyToken, checkRole("administrador", "coordinador"), deleteUser);

module.exports = router;