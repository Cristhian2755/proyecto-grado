//const express = require("express");
//const router = express.Router();

//const authControlle = require("../controllers/authController");

//router.post("/register", authController.registerUser);
//router.post("/login", authController.loginUser);

//module.exports = router;

//rutas de prueba 
const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = router;