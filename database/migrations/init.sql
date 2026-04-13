CREATE TABLE roles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    rol_principal TEXT NOT NULL DEFAULT 'estudiante'
);

CREATE TABLE usuario_roles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    usuario_id BIGINT REFERENCES usuarios(id) ON DELETE CASCADE,
    rol TEXT NOT NULL,
    UNIQUE(usuario_id, rol)
);

CREATE TABLE lineas_tematicas (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL
);

CREATE TABLE proyectos (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    titulo TEXT NOT NULL,
    problema TEXT NOT NULL,
    justificacion TEXT NOT NULL,
    objetivos TEXT NOT NULL,
    estudiante_id BIGINT REFERENCES usuarios(id),
    linea_tematica_id BIGINT REFERENCES lineas_tematicas(id),
    estado TEXT NOT NULL DEFAULT 'Propuesto'
);

CREATE TABLE revisiones (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    proyecto_id BIGINT REFERENCES proyectos(id),
    revisor_id BIGINT REFERENCES usuarios(id),
    comentario TEXT,
    aprobado BOOLEAN DEFAULT FALSE,
    fecha_revision TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notificaciones (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    usuario_id BIGINT REFERENCES usuarios(id),
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    fecha TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE entregas (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    proyecto_id BIGINT REFERENCES proyectos(id),
    archivo TEXT NOT NULL,
    version INT NOT NULL,
    fecha_entrega TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE evaluaciones (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    entrega_id BIGINT REFERENCES entregas(id),
    evaluador_id BIGINT REFERENCES usuarios(id),
    nota DECIMAL(5, 2),
    comentario TEXT,
    fecha_evaluacion TIMESTAMPTZ DEFAULT NOW()
);