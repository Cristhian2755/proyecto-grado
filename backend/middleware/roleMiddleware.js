// Verificar rol de usuario
const normalizeRole = (role) => {
  if (!role || typeof role !== "string") return "";

  const normalized = role
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  if (normalized.includes("administrador")) return "administrador";
  if (normalized.includes("coordinador")) return "coordinador";
  if (normalized.includes("estudiante")) return "estudiante";
  if (normalized.includes("docente") || normalized.includes("asesor") || normalized.includes("jurado")) return "docente";

  return normalized;
};

const checkRole = (...rolesPermitidos) => {
  return (req, res, next) => {
    const userRole = normalizeRole(req.user?.rol);
    const normalizedAllowedRoles = rolesPermitidos.map((role) => normalizeRole(role));

    if (!userRole) {
      return res.status(401).json({
        message: "Usuario no autenticado"
      });
    }

    if (!normalizedAllowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "No tienes permisos para acceder a este recurso"
      });
    }

    next();
  };
};

module.exports = { checkRole };
