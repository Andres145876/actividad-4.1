// Definición de Módulos
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Llamada de esquemas MongoDB
const User = require('../models/Login'); // Cambié Login a User por claridad
const Admin = require('../models/AdminLogin');

// 🔹 Registro de usuario normal
router.post('/register', async (req, res) => {
    try {
        const { idNombre, idEmail, idContra } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ idEmail });
        const existingAdmin = await Admin.findOne({ idEmail });
        
        if (existingUser || existingAdmin) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(idContra, 10);

        // Crear un nuevo usuario
        const newUser = new User({ idNombre, idEmail, idContra: hashedPassword });

        // Guardar en la base de datos
        await newUser.save();

        return res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error de servidor', error: error.message });
    }
});

// 🔹 Registro de administrador
router.post('/register-admin', async (req, res) => {
    try {
        const { idNombre, idEmail, idContra } = req.body;

        // Verificar si el administrador ya existe
        const existingUser = await User.findOne({ idEmail });
        const existingAdmin = await Admin.findOne({ idEmail });
        
        if (existingUser || existingAdmin) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(idContra, 10);

        // Crear un nuevo administrador
        const newAdmin = new Admin({ idNombre, idEmail, idContra: hashedPassword });

        // Guardar en la base de datos
        await newAdmin.save();

        return res.status(201).json({ message: 'Administrador creado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error de servidor', error: error.message });
    }
});

// 🔹 Inicio de sesión para usuarios normales
router.post('/login', async (req, res) => {
    try {
        const { idEmail, idContra } = req.body;

        // Buscar usuario
        const user = await User.findOne({ idEmail });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(idContra, user.idContra);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'User Inicio de sesión exitoso', token });
    } catch (error) {
        return res.status(500).json({ message: 'Error de servidor', error: error.message });
    }
});

// 🔹 Inicio de sesión para administradores
router.post('/login-admin', async (req, res) => {
    try {
        const { idEmail, idContra } = req.body;

        // Buscar administrador
        const admin = await Admin.findOne({ idEmail });
        if (!admin) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(idContra, admin.idContra);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Admin Inicio de sesión exitoso', token });
    } catch (error) {
        return res.status(500).json({ message: 'Error de servidor', error: error.message });
    }
});

// 🔹 Obtener todos los usuarios normales
router.get('/ver-usuarios', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
});

// 🔹 Obtener todos los administradores
router.get('/ver-admins', async (req, res) => {
    try {
        const admins = await Admin.find();
        return res.status(200).json(admins);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener administradores', error: error.message });
    }
});

// 🔹 Eliminar un usuario
router.delete('/eliminar-usuario/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Eliminar el usuario de la base de datos
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
});


module.exports = router;