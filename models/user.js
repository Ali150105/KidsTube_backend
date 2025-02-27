const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'El correo electrónico es requerido'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Por favor, ingresa un correo electrónico válido'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
    phone: {
        type: String,
        required: [true, 'El número telefónico es requerido'],
    },
    pin: {
        type: String,
        required: [true, 'El PIN es requerido'],
        minlength: [6, 'El PIN debe tener 6 dígitos'],
        maxlength: [6, 'El PIN debe tener 6 dígitos'],
    },
    firstName: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    lastName: {
        type: String,
        required: [true, 'Los apellidos son requeridos'],
    },
    country: {
        type: String,
    },
    birthdate: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida'],
    },
});

// Hash de la contraseña antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);