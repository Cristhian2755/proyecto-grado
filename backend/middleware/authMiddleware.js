const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token requerido" });
  }

  try {

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({ message: "Token inválido" });

  }

};

const checkRole = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        message: "No tienes permiso"
      });
    }

    next();

  };

};

module.exports = { verifyToken, checkRole };