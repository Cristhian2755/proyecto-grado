const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: { rejectUnauthorized: false }
});

async function initDatabase() {
  const client = await pool.connect();
  try {
    console.log('Inicializando BD...');

    // Drop CASCADE de todas las tablas
    console.log('Limpiando....');
    const dropQueries = [
      'DROP TABLE IF EXISTS evaluaciones CASCADE',
      'DROP TABLE IF EXISTS entregas CASCADE',
      'DROP TABLE IF EXISTS notificaciones CASCADE',
      'DROP TABLE IF EXISTS revisiones CASCADE',
      'DROP TABLE IF EXISTS proyectos CASCADE',
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
          rol_id BIGINT REFERENCES roles(id)
      )
    `);
    console.log('✓ Tabla usuarios creada');

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
      ('Coordinador'),
      ('Estudiante'),
      ('Asesor'),
      ('Jurado')
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
      INSERT INTO usuarios (nombre, email, contrasena, rol_id) VALUES
      ('Admin ISER', 'admin@iser.edu.co', 'hashed_password', 1),
      ('Carlos Estudiante', 'carlos@iser.edu.co', 'hashed_password', 2),
      ('Maria Asesor', 'maria@iser.edu.co', 'hashed_password', 3),
      ('Juan Jurado', 'juan@iser.edu.co', 'hashed_password', 4)
    `);
    console.log('✓ Usuarios insertados');

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