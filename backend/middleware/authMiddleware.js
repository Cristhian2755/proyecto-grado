// middleware de verificación de tokens
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Permitir pruebas locales sin token cuando ALLOW_AI_TESTING=true
    if (process.env.ALLOW_AI_TESTING === 'true') {
      req.user = { id: 0, nombre: 'Test User', email: 'test@test.com', rol: 'estudiante' };
      return next();
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(403).json({ message: "Token requerido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      nombre: decoded.nombre,
      email: decoded.email,
      rol: decoded.rol,
      carrera_id: decoded.carrera_id
    };
    next();

  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = { verifyToken };