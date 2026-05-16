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

const ensureFolder = (folderName) => {
  const target = path.join(docsPath, folderName);
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  return target;
};

if (!fs.existsSync(docsPath)) {
  fs.mkdirSync(docsPath, { recursive: true });
}

for (const folderName of new Set(folderAliases.values())) {
  ensureFolder(folderName);
}

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    // Logear cuerpo para depuración (ver si multer recibe campos antes del archivo)
    try {
      console.log('[uploadMiddleware] req.body keys:', Object.keys(req.body || {}));
      console.log('[uploadMiddleware] carpeta raw:', req.body?.carpeta);
    } catch (e) {
      console.log('[uploadMiddleware] error leyendo req.body:', e && e.message);
    }

    // Preferir campo en body (multipart) pero aceptar query param como respaldo
    const rawFolderSource = (typeof req.body?.carpeta === "string" && req.body.carpeta) || req.query?.carpeta || "propuesta";
    const rawFolder = typeof rawFolderSource === "string" ? rawFolderSource.toLowerCase().trim() : "propuesta";
    const folderName = folderAliases.get(rawFolder) || "propuesta";
    cb(null, ensureFolder(folderName));
  },
  filename: (req, file, cb) => {
    console.log('[uploadMiddleware] generando filename, proyecto_id:', req.body && req.body.proyecto_id);
    const ext = path.extname(file.originalname);
    const safeBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, "_")
      .slice(0, 50);
    const proyectoId = req.body.proyecto_id || "sin_proyecto";
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${safeBase}-p${proyectoId}-${unique}${ext}`);
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
