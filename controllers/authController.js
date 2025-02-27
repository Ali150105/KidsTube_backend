const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { email, password, phone, pin, firstName, lastName, country, birthdate } = req.body;

        // Validar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        const newUser = new User({
            email,
            password,
            phone,
            pin,
            firstName,
            lastName,
            country,
            birthdate,
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor', error: err.message });
    }
};