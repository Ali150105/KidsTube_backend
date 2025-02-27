const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importar cors
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:3000', // Permitir solicitudes desde el frontend
    credentials: true, // Permitir cookies y encabezados de autenticación
}));

// Middleware
app.use(express.json()); // Para parsear JSON

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

// Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});