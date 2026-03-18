// Controlador de proyectos
const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { titulo, problema, justificacion, objetivos } = req.body;

    const project = new Project({
      titulo,
      problema,
      justificacion,
      objetivos,
      estudiante_id: req.user.id
    });

    await project.save();

    res.status(201).json({ message: "Proyecto creado", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creando el proyecto" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    // Si quieres filtrar por usuario, puedes usar req.user.id
    const projects = await Project.find();
    res.json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error listando proyectos" });
  }
};

exports.reviewProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    project.estado = estado || project.estado;
    await project.save();

    res.json({ message: "Proyecto actualizado", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error revisando el proyecto" });
  }
};
