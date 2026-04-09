const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { connectDB, pool } = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const entregaRoutes = require("./routes/entregaRoutes");

const app = express();

// Conectar a BD
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/docs", express.static(path.join(__dirname, "..", "docs")));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/entregas", entregaRoutes);

// Health check
app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "OK",
      database: "conectado",
      timestamp: result.rows[0].now,
      port: process.env.PORT || 5001
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      database: "desconectado",
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

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✓ Backend corriendo en http://localhost:${PORT}`);
  console.log(`✓ API disponible en http://localhost:${PORT}/api`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
  console.log(`✓ Conectado a PostgreSQL Azure desde backend`);
});
