const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, projectController.getProjects);

router.post("/", verifyToken, projectController.createProject);

module.exports = router;