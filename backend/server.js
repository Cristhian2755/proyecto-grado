const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Conexión a PostgreSQL (usa DATABASE_URL desde .env)
require('dotenv').config();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("las APIs del proyectos funcionando");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Servidor corriendo...');
    console.log(`URL: http://localhost:${PORT}`);
});