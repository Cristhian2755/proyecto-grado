const Entrega = require("../models/Entrega");

exports.uploadEntrega = async (req, res) => {
  try {
    const { proyecto_id } = req.body;

    if (!proyecto_id) {
      return res.status(400).json({ message: "proyecto_id es requerido" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Archivo requerido" });
    }

    const version = await Entrega.getNextVersion(proyecto_id);
    const relativePath = `docs/${req.file.filename}`;

    const nuevaEntrega = await Entrega.create({
      proyecto_id,
      archivo: relativePath,
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

exports.getEntregasByProyecto = async (req, res) => {
  try {
    const { proyecto_id } = req.params;
    const entregas = await Entrega.findByProyecto(proyecto_id);

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
