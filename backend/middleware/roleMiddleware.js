const checkRole = (...roles) => {

  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({
        message: "Usuario no autenticado"
      });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        message: "No tienes permiso para acceder"
      });
    }

    next();

  };

};

module.exports = checkRole;