// middleware de verificación de tokens
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(403).json({ message: "Token requerido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = { verifyToken };