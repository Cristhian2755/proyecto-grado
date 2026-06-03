const { pool } = require('../config/db');
const path = require('path');
const fs = require('fs');
const { getBibliotecaCatalog } = require('../modules/AIClassificationModule/services/documentChatService');
const User = require('../models/User');

const DOCS_ROOT = path.resolve(__dirname, '../../docs');
const DOCS_BIBLIOTECA_ROOT = path.resolve(DOCS_ROOT, 'ProjectsBiblioteca');

// Listar todos los proyectos (para administrador/coordinador)
exports.listProjects = async (req, res) => {
  try {
    const query = `
      SELECT p.id, p.titulo, p.problema, p.justificacion, p.objetivos,
             p.estudiante_id, u.nombre AS estudiante_nombre, u.email AS estudiante_email,
             lt.nombre AS linea_tematica, p.estado
      FROM proyectos p
      LEFT JOIN usuarios u ON p.estudiante_id = u.id
      LEFT JOIN lineas_tematicas lt ON p.linea_tematica_id = lt.id
      ORDER BY p.id DESC
    `;

    let dbProjects = [];
    try {
      const result = await pool.query(query);
      dbProjects = result.rows || [];
    } catch (dbErr) {
      // Si la tabla no existe o hay error de BD, no interrumpimos: devolvemos solo la biblioteca
      console.warn('Fallo consulta proyectos en BD, se devolverán solo documentos de biblioteca:', dbErr.message || dbErr);
      dbProjects = [];
    }

    // Adjuntar proyectos desde ProjectsBiblioteca
    let bibliotecaDocs = [];
    try {
      bibliotecaDocs = await getBibliotecaCatalog();
      // Mapear para que tengan campos similares a proyectos
      bibliotecaDocs = bibliotecaDocs.map((doc) => ({
        ...doc,
        id: `bibl-${doc.id}`,
        fuente: 'biblioteca',
      }));
    } catch (e) {
      bibliotecaDocs = [];
    }

    // Combinar DB + biblioteca (biblioteca al final)
    res.json({ data: [...dbProjects, ...bibliotecaDocs] });
  } catch (error) {
    console.error('Error listando proyectos inesperado:', error);
    res.status(500).json({ message: 'Error al obtener proyectos', error: error.message });
  }
};

// Importar un archivo de biblioteca como registro de proyecto en la BD
exports.importBiblioteca = async (req, res) => {
  try {
    const { documentName } = req.body;
    if (!documentName) {
      return res.status(400).json({ message: 'documentName es requerido' });
    }

    const catalog = await getBibliotecaCatalog();
    const doc = catalog.find((d) => d.documentName === documentName || d.documentUrl.endsWith(encodeURIComponent(documentName)));
    if (!doc) {
      return res.status(404).json({ message: 'Documento no encontrado en biblioteca' });
    }

    // Intentar encontrar usuario por nombre
    const usuarios = await User.findAll();
    const matched = usuarios.find((u) => (u.nombre || '').toLowerCase().includes((doc.estudiante_nombre || '').toLowerCase()));
    const estudianteId = matched ? matched.id : null;

    const insertQuery = `
      INSERT INTO proyectos (titulo, problema, justificacion, objetivos, estudiante_id, linea_tematica_id, carrera_id, estado)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [doc.titulo, doc.problema || '', doc.problema || '', '', estudianteId, null, null, doc.estado || 'APROBADO'];
    const insertResult = await pool.query(insertQuery, values);
    const created = insertResult.rows[0];

    res.status(201).json({ message: 'Proyecto importado desde biblioteca', data: created });
  } catch (error) {
    console.error('Error importando desde biblioteca:', error);
    res.status(500).json({ message: 'Error al importar documento', error: error.message });
  }
};

// Eliminar un archivo de ProjectsBiblioteca
exports.deleteBibliotecaFile = async (req, res) => {
  try {
    const { fileName } = req.params;
    if (!fileName) return res.status(400).json({ message: 'fileName requerido' });

    const targetPath = path.join(DOCS_BIBLIOTECA_ROOT, decodeURIComponent(fileName));
    if (!targetPath.startsWith(DOCS_BIBLIOTECA_ROOT) || !fs.existsSync(targetPath)) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    fs.unlinkSync(targetPath);
    res.json({ message: 'Archivo eliminado de ProjectsBiblioteca' });
  } catch (error) {
    console.error('Error eliminando archivo biblioteca:', error);
    res.status(500).json({ message: 'Error al eliminar archivo', error: error.message });
  }
};

// Obtener proyecto por ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT p.id, p.titulo, p.problema, p.justificacion, p.objetivos,
             p.estudiante_id, u.nombre AS estudiante_nombre, u.email AS estudiante_email,
             lt.nombre AS linea_tematica, p.estado
      FROM proyectos p
      LEFT JOIN usuarios u ON p.estudiante_id = u.id
      LEFT JOIN lineas_tematicas lt ON p.linea_tematica_id = lt.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.json({ data: result.rows[0] });
  } catch (error) {
    console.error('Error obteniendo proyecto:', error);
    res.status(500).json({ message: 'Error al obtener proyecto', error: error.message });
  }
};
