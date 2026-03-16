
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// base de datos temporal en memoria
let users = [];

exports.registerUser = async (req, res) => {

  const { nombre, email, password } = req.body;

  try {

    const userExist = users.find(user => user.email === email);

    if (userExist) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      nombre,
      email,
      password: hashedPassword,
      rol: "estudiante"
    };

    users.push(newUser);

    res.json({
      message: "Usuario registrado correctamente"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error en el servidor"
    });

  }
};

exports.loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado"
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Contraseña incorrecta"
      });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login exitoso",
      token
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error en el servidor"
    });

  }
};