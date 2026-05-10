const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Módulo de IA disponible"
  });
});

module.exports = router;