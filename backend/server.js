const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { connectDB, pool } = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const { getBibliotecaCatalog } = require("./modules/AIClassificationModule/services/documentChatService");

const authRoutes = require("./routes/authRoutes");
const entregaRoutes = require("./routes/entregaRoutes");
const projectRoutes = require("./routes/projectRoutes");
const aiRoutes = require("./modules/AIClassificationModule/routes/aiRoutes");

const app = express();

function getJwtHealth() {
  if (!process.env.JWT_SECRET) {
    return {
      jwt: "no configurado",
      jwtConfigured: false,
      jwtStatus: "no configurado"
    };
  }

  try {
    const token = jwt.sign({ health: true }, process.env.JWT_SECRET, { expiresIn: "1m" });
    jwt.verify(token, process.env.JWT_SECRET);

    return {
      jwt: "funcionando",
      jwtConfigured: true,
      jwtStatus: "funcionando"
    };
  } catch (error) {
    return {
      jwt: "error",
      jwtConfigured: false,
      jwtStatus: `error: ${error.message}`
    };
  }
}

async function bootstrap() {
  // Conectar a BD
  await connectDB();

  // Precalentar el catálogo de biblioteca para evitar una carga lenta en la primera visita
  getBibliotecaCatalog().catch((error) => {
    console.warn('No se pudo precargar la biblioteca en el arranque:', error.message || error);
  });

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use("/docs", express.static(path.join(__dirname, "..", "docs")));

  // Rutas
  app.use("/api/auth", authRoutes);
  app.use("/api/entregas", entregaRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5001;

  // Health check
  app.get("/health", async (req, res) => {
    const jwtHealth = getJwtHealth();

    try {
      const result = await pool.query("SELECT NOW()");
      res.json({
        status: "OK",
        database: "conectado",
        ...jwtHealth,
        timestamp: result.rows[0].now,
        port: process.env.PORT || 5001
      });
    } catch (error) {
      res.status(500).json({
        status: "ERROR",
        database: "desconectado",
        ...jwtHealth,
        error: error.message
      });
    }
  });

  // Ruta raíz
  app.get("/", (req, res) => {
    res.json({ message: "API Plataforma de Proyectos ISER funcionando ✓" });
  });

  // Middleware de error global
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`✓ Backend corriendo en http://localhost:${PORT}`);
    console.log(`✓ API disponible en http://localhost:${PORT}/api`);
    console.log(`✓ Health check: http://localhost:${PORT}/health`);
    console.log(`✓ Conectado a PostgreSQL Azure desde backend`);
  });
}

bootstrap().catch((error) => {
  console.error('Error al iniciar el backend:', error);
  process.exit(1);
});
