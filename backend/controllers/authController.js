// controladores para autenticación de usuarios
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Registrar nuevo usuario
exports.registerUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Campos requeridos faltantes" });
    }

    const userExist = await User.findByEmail(email);
    if (userExist) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol: "estudiante"
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      data: { id: newUser.id, nombre: newUser.nombre, email: newUser.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña requeridos" });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login exitoso",
      data: {
        token,
        user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol }
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};