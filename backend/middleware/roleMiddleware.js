// Verificar rol de usuario
const checkRole = (...rolesPermitidos) => {
  return (req, res, next) => {
    const userRole = req.user?.rol;

    if (!userRole) {
      return res.status(401).json({
        message: "Usuario no autenticado"
      });
    }

    if (!rolesPermitidos.includes(userRole)) {
      return res.status(403).json({
        message: "No tienes permisos para acceder a este recurso"
      });
    }

    next();
  };
};

module.exports = { checkRole };
