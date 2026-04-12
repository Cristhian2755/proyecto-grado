const Project = require("../models/Project");

// Crear nuevo proyecto
exports.createProject = async (req, res) => {
  try {
    const { titulo, problema, justificacion, objetivos } = req.body;
    const estudiante_id = req.user.id;

    if (!titulo || !problema || !justificacion || !objetivos) {
      return res.status(400).json({ message: "Campos requeridos faltantes" });
    }

    const newProject = await Project.create({
      titulo, problema, justificacion, objetivos, estudiante_id
    });

    res.status(201).json({
      message: "Proyecto creado correctamente",
      data: newProject
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el proyecto", error: error.message });
  }
};

// Obtener todos los proyectos
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json({ data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener proyectos" });
  }
};

// Obtener proyecto por ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.json({ data: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el proyecto" });
  }
};

// Obtener proyectos de un estudiante
exports.getMyProjects = async (req, res) => {
  try {
    const estudiante_id = req.user.id;
    const projects = await Project.findByEstudiante(estudiante_id);
    res.json({ data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener tus proyectos" });
  }
};

// Obtener proyectos asignados a un docente (como revisor/asesor/jurado)
exports.getMyAssignedProjects = async (req, res) => {
  try {
    const docente_id = req.user.id;
    const projects = await Project.findByDocente(docente_id);
    res.json({ data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener tus proyectos asignados" });
  }
};

// Actualizar proyecto
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProject = await Project.update(id, updateData);

    if (!updatedProject) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.json({ message: "Proyecto actualizado", data: updatedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el proyecto" });
  }
};

// Eliminar proyecto
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    await Project.delete(id);
    res.json({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el proyecto" });
  }
};
