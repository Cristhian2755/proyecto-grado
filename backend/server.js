const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, pool } = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

// Conectar a BD
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

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
  console.log(`✓ Servidor corriendo en puerto ${PORT}`);
  console.log(`✓ Base de datos: ProyectoGrado (Azure)`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
});
