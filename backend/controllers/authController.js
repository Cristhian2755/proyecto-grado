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

// CRUD de usuarios para administradores

// Listar todos los usuarios
exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};

// Crear nuevo usuario (admin/coordinador)
exports.createUser = async (req, res) => {
  try {
    const { nombre, email, password, rol, subroles = [] } = req.body;

    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ message: "Campos requeridos faltantes" });
    }

    const allowedRoles = ['administrador', 'coordinador', 'estudiante', 'docente'];
    if (!allowedRoles.includes(rol)) {
      return res.status(400).json({ message: "Rol no válido" });
    }

    const allowedSubroles = ['asesor', 'jurado'];
    if (subroles && subroles.length > 0) {
      for (const subrrol of subroles) {
        if (!allowedSubroles.includes(subrrol)) {
          return res.status(400).json({ message: `Subrrol no válido: ${subrrol}` });
        }
      }
      // Solo los docentes pueden tener subroles
      if (rol !== 'docente') {
        return res.status(400).json({ message: "Solo los docentes pueden tener subroles" });
      }
    }

    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
      subroles: rol === 'docente' ? subroles : []
    });

    res.status(201).json({
      message: "Usuario creado correctamente",
      data: { id: newUser.id, nombre: newUser.nombre, email: newUser.email, rol: newUser.rol }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario", error: error.message });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rol, subroles } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const updates = {};
    if (nombre) updates.nombre = nombre;
    if (email) {
      const emailExists = await User.findByEmail(email);
      if (emailExists && emailExists.id !== user.id) {
        return res.status(400).json({ message: "El email ya está en uso" });
      }
      updates.email = email;
    }
    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }
    if (rol) {
      const allowedRoles = ['administrador', 'coordinador', 'estudiante', 'docente'];
      if (!allowedRoles.includes(rol)) {
        return res.status(400).json({ message: "Rol no válido" });
      }
      updates.rol = rol;
    }

    const updatedUser = await User.updateUser(id, updates);

    // Actualizar subroles si se especifican y el usuario es docente
    if (subroles && rol === 'docente') {
      const allowedSubroles = ['asesor', 'jurado'];
      for (const subrrol of subroles) {
        if (!allowedSubroles.includes(subrrol)) {
          return res.status(400).json({ message: `Subrrol no válido: ${subrrol}` });
        }
      }
      await User.setUserSubroles(id, subroles);
    }

    res.json({
      message: "Usuario actualizado correctamente",
      data: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await User.deleteUser(id);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar usuario", error: error.message });
  }
};

// Obtener subroles de un docente
exports.getUserSubroles = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.rol !== 'docente') {
      return res.status(400).json({ message: "Solo los docentes tienen subroles" });
    }

    const subroles = await User.getUserRoles(id);
    res.json({ 
      data: {
        userId: id,
        rol: user.rol,
        subroles: subroles.filter(r => r !== 'docente')
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener subroles", error: error.message });
  }
};

// Asignar subroles a un docente
exports.setUserSubroles = async (req, res) => {
  try {
    const { id } = req.params;
    const { subroles = [] } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.rol !== 'docente') {
      return res.status(400).json({ message: "Solo los docentes pueden tener subroles" });
    }

    const allowedSubroles = ['asesor', 'jurado'];
    for (const subrrol of subroles) {
      if (!allowedSubroles.includes(subrrol)) {
        return res.status(400).json({ message: `Subrrol no válido: ${subrrol}` });
      }
    }

    await User.setUserSubroles(id, subroles);
    
    res.json({ 
      message: "Subroles asignados correctamente",
      data: {
        userId: id,
        rol: user.rol,
        subroles: subroles
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al asignar subroles", error: error.message });
  }
};