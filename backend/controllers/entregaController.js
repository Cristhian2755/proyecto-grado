const Entrega = require("../models/Entrega");
const fs = require('fs');
const path = require('path');

exports.uploadEntrega = async (req, res) => {
  try {
    const carpeta = (req.body.carpeta || req.query?.carpeta || 'propuesta').toString().toLowerCase().trim();
    const usuario_id = req.user?.id;

    if (!req.file) {
      return res.status(400).json({ message: "Archivo requerido" });
    }

    if (!usuario_id) {
      return res.status(401).json({ message: "Usuario autenticado requerido" });
    }

    const version = await Entrega.getNextVersion(usuario_id, carpeta);
    const relativePath = path.posix.join('docs', carpeta, req.file.filename);

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
    const carpeta = (req.params.carpeta || 'propuesta').toString().toLowerCase().trim();
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);

    // Seguridad: estudiantes solo ven entregas vinculadas a sus proyectos; docentes/coordinador/administrador ven todo
    const user = req.user || {};
    const role = (user.rol || '').toString().toLowerCase();

    let entregas = [];

    if (role === 'estudiante') {
      entregas = await Entrega.findByCarpetaPaged(carpeta, page, limit, user.id);
    } else {
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
    const carpeta = (req.params.carpeta || 'propuesta').toString().toLowerCase().trim();
    const docsRoot = path.join(__dirname, '..', '..', 'docs');
    const folderPath = path.join(docsRoot, carpeta);

    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ message: 'Carpeta no encontrada' });
    }

    const files = fs.readdirSync(folderPath, { withFileTypes: true })
      .filter((d) => d.isFile())
      .map((d) => {
        const full = path.join(folderPath, d.name);
        const stat = fs.statSync(full);
        return {
          archivo: `docs/${carpeta}/${d.name}`,
          nombre_original: d.name,
          fecha_entrega: stat.mtime,
          url_descarga: `/${path.posix.join('docs', carpeta, d.name)}`
        };
      });

    return res.json({ data: files });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al escanear carpeta', error: error.message });
  }
};
