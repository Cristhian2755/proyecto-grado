const fs = require("fs");
const path = require("path");
const multer = require("multer");

const docsPath = path.join(__dirname, "..", "..", "docs");

if (!fs.existsSync(docsPath)) {
  fs.mkdirSync(docsPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, docsPath);
  },
  filename: (req, file, cb) => {
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
  const allowed = new Set([".pdf", ".doc", ".docx", ".zip", ".rar", ".txt"]);
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowed.has(ext)) {
    return cb(new Error("Tipo de archivo no permitido"));
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
