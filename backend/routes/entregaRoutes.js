const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { uploadEntrega } = require("../middleware/uploadMiddleware");
const entregaController = require("../controllers/entregaController");

router.post("/upload", verifyToken, uploadEntrega.single("archivo"), entregaController.uploadEntrega);
router.get("/proyecto/:proyecto_id", verifyToken, entregaController.getEntregasByProyecto);

module.exports = router;
