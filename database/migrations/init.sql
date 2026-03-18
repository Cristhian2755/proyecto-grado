-- database/migrations/init.sql
-- Inicializa el esquema de la base de datos para la aplicación

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'estudiante',
  fecha_registro TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lineas_tematicas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS proyectos (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  problema TEXT NOT NULL,
  justificacion TEXT NOT NULL,
  objetivos TEXT NOT NULL,
  estudiante_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  linea_tematica_id INTEGER REFERENCES lineas_tematicas(id),
  estado TEXT NOT NULL DEFAULT 'pendiente',
  fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS evaluaciones (
  id SERIAL PRIMARY KEY,
  proyecto_id INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
  evaluador_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  comentario TEXT,
  aprobado BOOLEAN NOT NULL DEFAULT FALSE,
  fecha_evaluacion TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notificaciones (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  mensaje TEXT NOT NULL,
  leido BOOLEAN NOT NULL DEFAULT FALSE,
  fecha TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS entregas (
  id SERIAL PRIMARY KEY,
  proyecto_id INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
  estudiante_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  descripcion TEXT NOT NULL,
  fecha_entrega TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  archivo_url TEXT
);
