const Entrega = require("../models/Entrega");
const fs = require('fs');
const path = require('path');

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

const sanitizeFolderName = (name) => {
  if (!name || typeof name !== "string") return "sin_nombre";
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "_")
    .substring(0, 100) || "sin_nombre";
};

exports.uploadEntrega = async (req, res) => {
  try {
    const rawCarpeta = req.body.carpeta || req.query?.carpeta || 'propuesta';
    const carpeta = normalizeCarpeta(rawCarpeta);
    const usuario_id = req.user?.id;
    const usuario_nombre = req.user?.nombre;

    if (!req.file) {
      return res.status(400).json({ message: "Archivo requerido" });
    }

    if (!usuario_id) {
      return res.status(401).json({ message: "Usuario autenticado requerido" });
    }

    const version = await Entrega.getNextVersion(usuario_id, carpeta);
    
    // Nueva estructura: docs/carpeta/nombre_estudiante/archivo
    const studentFolderName = sanitizeFolderName(usuario_nombre);
    const relativePath = path.posix.join('docs', carpeta, studentFolderName, req.file.filename);

    const nuevaEntrega = await Entrega.create({
      usuario_id,
      archivo: relativePath,
      carpeta,
      version
    });

    return res.status(201).json({
      message: "Entrega registrada correctamente",
      data: {
        ...nuevaEntrega,
        nombre_original: req.file.originalname,
        url_descarga: `/${relativePath}`
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al subir entrega", error: error.message });
  }
};

exports.getEntregasByUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const entregas = await Entrega.findByUsuario(usuario_id);

    return res.json({
      data: entregas.map((item) => ({
        ...item,
        url_descarga: `/${item.archivo}`
      }))
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al listar entregas", error: error.message });
  }
};



exports.getEntregasByCarpeta = async (req, res) => {
  try {
    const rawCarpeta = req.params.carpeta || 'propuesta';
    const carpeta = normalizeCarpeta(rawCarpeta);
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);

    // Seguridad: estudiantes solo ven entregas vinculadas a sus proyectos; docentes/coordinador/administrador ven todo o por carrera
    const user = req.user || {};
    const role = (user.rol || '').toString().toLowerCase();
    const carreraId = user.carrera_id;

    let entregas = [];

    if (role === 'estudiante') {
      entregas = await Entrega.findByCarpetaPaged(carpeta, page, limit, user.id);
    } else if (role === 'coordinador' && carreraId) {
      // Coordinador ve solo entregas de su carrera
      entregas = await Entrega.findByCarpetaPaged(carpeta, page, limit, null, carreraId);
    } else {
      // Admin/Docentes ven todo
      entregas = await Entrega.findByCarpetaPaged(carpeta, page, limit, null);
    }

    return res.json({
      data: entregas.map((item) => ({
        ...item,
        url_descarga: `/${item.archivo}`
      }))
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al listar entregas por carpeta", error: error.message });
  }
};

exports.scanCarpeta = async (req, res) => {
  try {
    const rawCarpeta = req.params.carpeta || 'propuesta';
    const carpeta = normalizeCarpeta(rawCarpeta);
    const docsRoot = path.join(__dirname, '..', '..', 'docs');
    const folderPath = path.join(docsRoot, carpeta);

    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ message: 'Carpeta no encontrada' });
    }

    const files = [];
    const user = req.user || {};
    const role = (user.rol || '').toString().toLowerCase();
    const usuarioId = user.id;
    const usuarioNombre = sanitizeFolderName(user.nombre || '');
    const carreraId = user.carrera_id;

    // Obtener lista de estudiantes a filtrar según el rol
    let allowedStudentIds = new Set();
    let allowedStudentNames = new Set();

    if (role === 'estudiante') {
      // Estudiante solo ve sus propios documentos
      allowedStudentNames.add(usuarioNombre);
    } else if (role === 'coordinador' && carreraId) {
      // Coordinador ve estudiantes de su carrera
      const studentsOfCarrera = await require('../models/User').getStudentsByCarrera(carreraId);
      studentsOfCarrera.forEach(s => {
        allowedStudentIds.add(s.id);
        allowedStudentNames.add(sanitizeFolderName(s.nombre));
      });
    }
    // Admin/Docentes ven todo (allowedStudentNames queda vacío)

    // Leer carpetas de estudiantes
    const studentFolders = fs.readdirSync(folderPath, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const studentFolder of studentFolders) {
      // Aplicar filtros según rol
      if (role === 'estudiante' && !allowedStudentNames.has(studentFolder.name)) {
        continue;
      }
      if (role === 'coordinador' && carreraId && !allowedStudentNames.has(studentFolder.name)) {
        continue;
      }

      const studentPath = path.join(folderPath, studentFolder.name);
      
      // Leer archivos dentro de cada carpeta de estudiante
      const studentFiles = fs.readdirSync(studentPath, { withFileTypes: true })
        .filter((d) => d.isFile());

      for (const file of studentFiles) {
        const fullPath = path.join(studentPath, file.name);
        const stat = fs.statSync(fullPath);
        files.push({
          archivo: path.posix.join('docs', carpeta, studentFolder.name, file.name),
          nombre_original: file.name,
          fecha_entrega: stat.mtime,
          url_descarga: `/${path.posix.join('docs', carpeta, studentFolder.name, file.name)}`,
          estudiante: studentFolder.name
        });
      }
    }

    // Ordenar por fecha descendente
    files.sort((a, b) => new Date(b.fecha_entrega) - new Date(a.fecha_entrega));

    return res.json({ data: files });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al escanear carpeta', error: error.message });
  }
};
