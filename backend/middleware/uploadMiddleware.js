const fs = require("fs");
const path = require("path");
const multer = require("multer");

const docsPath = path.join(__dirname, "..", "..", "docs");

const folderAliases = new Map([
  ["propuesta", "propuesta"],
  ["cronograma", "cronograma"],
  ["informe semana 6", "informe semana 6"],
  ["anexos", "anexos"],
  ["asesoria", "asesoria"],
  ["asesorias", "asesoria"],
  ["informe final", "informe final"]
]);

const normalizeCarpeta = (carpeta) => {
  const normalized = (carpeta || 'propuesta').toString().toLowerCase().trim();
  return folderAliases.get(normalized) || "propuesta";
};

const ensureFolder = (folderName) => {
  const target = path.join(docsPath, folderName);
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  return target;
};

const sanitizeFolderName = (name) => {
  if (!name || typeof name !== "string") return "sin_nombre";
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "_")
    .substring(0, 100) || "sin_nombre";
};

if (!fs.existsSync(docsPath)) {
  fs.mkdirSync(docsPath, { recursive: true });
}

for (const folderName of new Set(folderAliases.values())) {
  ensureFolder(folderName);
}

const { randomUUID } = require('crypto');

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    try {
      // Obtener carpeta principal y normalizarla
      const rawFolderSource = (typeof req.body?.carpeta === "string" && req.body.carpeta) || req.query?.carpeta || "propuesta";
      const folderName = normalizeCarpeta(rawFolderSource);
      
      // Obtener nombre del estudiante
      const studentName = sanitizeFolderName(req.user?.nombre || "sin_nombre");
      
      // Crear ruta: docs/carpeta/nombre_estudiante/
      const studentFolder = path.join(docsPath, folderName, studentName);
      
      if (!fs.existsSync(studentFolder)) {
        fs.mkdirSync(studentFolder, { recursive: true });
      }
      
      cb(null, studentFolder);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${req.user.id}-${Date.now()}-${path.basename(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowed = new Set([".pdf", ".doc", ".docx", ".xls", ".xlsx"]);
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowed.has(ext)) {
    return cb(new Error("Tipo de archivo no permitido. Solo PDF, Word o Excel."));
  }

  cb(null, true);
};

const uploadEntrega = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024
  }
});

module.exports = { uploadEntrega };
