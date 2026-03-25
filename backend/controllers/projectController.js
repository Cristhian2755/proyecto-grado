// Controlador de proyectos
const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { titulo, problema, justificacion, objetivos } = req.body;

    const project = await Project.create({
      titulo,
      problema,
      justificacion,
      objetivos,
      estudiante_id: req.user.id
    });

    res.status(201).json({ message: "Proyecto creado", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Error creando el proyecto" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error listando proyectos" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo el proyecto" });
  }
};

exports.reviewProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    const project = await Project.update(id, {
      ...existingProject,
      estado: estado || existingProject.estado
    });

    res.json({ message: "Proyecto actualizado", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error revisando el proyecto" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.json({ message: "Proyecto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando el proyecto" });
  }
};
