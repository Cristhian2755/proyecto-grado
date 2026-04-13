const { Pool } = require('pg');
const path = require('path');
const bcrypt = require('../backend/node_modules/bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', 'backend', '.env') });

const pool = new Pool({
  host: process.env.PGHOST || process.env.DB_HOST,
  port: Number(process.env.PGPORT || process.env.DB_PORT || 5432),
  database: process.env.PGDATABASE || process.env.DB_NAME,
  user: process.env.PGUSER || process.env.DB_USER,
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

async function initDatabase() {
  const client = await pool.connect();
  try {
    console.log('Inicializando BD...');
    const defaultPassword = await bcrypt.hash('Admin12345!', 10);

    // Drop CASCADE de todas las tablas
    console.log('Limpiando....');
    const dropQueries = [
      'DROP TABLE IF EXISTS evaluaciones CASCADE',
      'DROP TABLE IF EXISTS entregas CASCADE',
      'DROP TABLE IF EXISTS notificaciones CASCADE',
      'DROP TABLE IF EXISTS revisiones CASCADE',
      'DROP TABLE IF EXISTS proyectos CASCADE',
      'DROP TABLE IF EXISTS usuario_roles CASCADE',
      'DROP TABLE IF EXISTS usuarios CASCADE',
      'DROP TABLE IF EXISTS lineas_tematicas CASCADE',
      'DROP TABLE IF EXISTS roles CASCADE'
    ];

    for (const query of dropQueries) {
      await client.query(query);
    }

    // Crear tablas de forma individual
    console.log('Creando tablas...');
    
    await client.query(`
      CREATE TABLE roles (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          nombre TEXT NOT NULL
      )
    `);
    console.log('✓ Tabla roles creada');

    await client.query(`
      CREATE TABLE usuarios (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          nombre TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          contrasena TEXT NOT NULL,
          rol_principal TEXT NOT NULL DEFAULT 'estudiante'
      )
    `);
    console.log('✓ Tabla usuarios creada');

    await client.query(`
      CREATE TABLE usuario_roles (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          usuario_id BIGINT REFERENCES usuarios(id) ON DELETE CASCADE,
          rol TEXT NOT NULL,
          UNIQUE(usuario_id, rol)
      )
    `);
    console.log('✓ Tabla usuario_roles creada');

    await client.query(`
      CREATE TABLE lineas_tematicas (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          nombre TEXT NOT NULL
      )
    `);
    console.log('✓ Tabla lineas_tematicas creada');

    await client.query(`
      CREATE TABLE proyectos (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          titulo TEXT NOT NULL,
          problema TEXT NOT NULL,
          justificacion TEXT NOT NULL,
          objetivos TEXT NOT NULL,
          estudiante_id BIGINT REFERENCES usuarios(id),
          linea_tematica_id BIGINT REFERENCES lineas_tematicas(id),
          estado TEXT NOT NULL DEFAULT 'Propuesto'
      )
    `);
    console.log('✓ Tabla proyectos creada');

    await client.query(`
      CREATE TABLE revisiones (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          proyecto_id BIGINT REFERENCES proyectos(id),
          revisor_id BIGINT REFERENCES usuarios(id),
          comentario TEXT,
          aprobado BOOLEAN DEFAULT FALSE,
          fecha_revision TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log('✓ Tabla revisiones creada');

    await client.query(`
      CREATE TABLE notificaciones (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          usuario_id BIGINT REFERENCES usuarios(id),
          mensaje TEXT NOT NULL,
          leido BOOLEAN DEFAULT FALSE,
          fecha TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log('✓ Tabla notificaciones creada');

    await client.query(`
      CREATE TABLE entregas (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          proyecto_id BIGINT REFERENCES proyectos(id),
          archivo TEXT NOT NULL,
          version INT NOT NULL,
          fecha_entrega TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log('✓ Tabla entregas creada');

    await client.query(`
      CREATE TABLE evaluaciones (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          entrega_id BIGINT REFERENCES entregas(id),
          evaluador_id BIGINT REFERENCES usuarios(id),
          nota DECIMAL(5, 2),
          comentario TEXT,
          fecha_evaluacion TIMESTAMPTZ DEFAULT NOW()
      )
    `);
    console.log('✓ Tabla evaluaciones creada');

    // Insertar datos
    console.log('Insertando datos...');
    
    await client.query(`
      INSERT INTO roles (nombre) VALUES
      ('administrador'),
      ('coordinador'),
      ('docente'),
      ('estudiante'),
      ('asesor'),
      ('jurado')
    `);
    console.log('✓ Roles insertados');

    await client.query(`
      INSERT INTO lineas_tematicas (nombre) VALUES
      ('Ingeniería de Software'),
      ('Desarrollo Web'),
      ('Base de Datos'),
      ('Inteligencia Artificial'),
      ('Ciberseguridad')
    `);
    console.log('✓ Líneas temáticas insertadas');

    await client.query(`
      INSERT INTO usuarios (nombre, email, contrasena, rol_principal) VALUES
      ('Admin ISER', 'admin@iser.edu.co', '${defaultPassword}', 'administrador'),
      ('Coordinador ISER', 'coordinador@iser.edu.co', '${defaultPassword}', 'coordinador'),
      ('Carlos Estudiante', 'carlos@iser.edu.co', '${defaultPassword}', 'estudiante'),
      ('Maria Docente', 'maria@iser.edu.co', '${defaultPassword}', 'docente'),
      ('Juan Docente', 'juan@iser.edu.co', '${defaultPassword}', 'docente')
    `);
    console.log('✓ Usuarios insertados');

    await client.query(`
      INSERT INTO usuario_roles (usuario_id, rol) VALUES
      (1, 'administrador'),
      (2, 'coordinador'),
      (3, 'estudiante'),
      (4, 'docente'),
      (4, 'asesor'),
      (5, 'docente'),
      (5, 'jurado')
    `);
    console.log('✓ Roles de usuarios insertados');

    await client.query(`
      INSERT INTO proyectos (titulo, problema, justificacion, objetivos, estudiante_id, linea_tematica_id, estado) VALUES
      ('Sistema de Gestión de Proyectos', 
       'No existe un sistema centralizado para gestionar los proyectos de grado',
       'Es necesario optimizar el proceso de administración de proyectos académicos',
       'Crear una plataforma web para gestionar proyectos de grado de forma integral',
       2, 1, 'Propuesto')
    `);
    console.log('✓ Proyectos insertados');

    await client.query(`
      INSERT INTO revisiones (proyecto_id, revisor_id, comentario, aprobado) VALUES
      (1, 3, 'Proyecto con buena fundamentación teórica', FALSE)
    `);
    console.log('✓ Revisiones insertadas');

    await client.query(`
      INSERT INTO notificaciones (usuario_id, mensaje, leido) VALUES
      (2, 'Tu proyecto ha sido revisado', FALSE),
      (3, 'Nuevo proyecto para revisar', FALSE)
    `);
    console.log('✓ Notificaciones insertadas');

    console.log('✅ Base de datos actualizada correctamente');
    client.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    client.release();
    process.exit(1);
  }
}

initDatabase();