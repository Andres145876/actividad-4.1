const mongoose = require('mongoose');

// Definir el esquema de usuario
const RegisterSchema = new mongoose.Schema({
    idNombre: { type: String, required: true },
    idEmail: { type: String, required: true, unique: true },
    idContra: { type: String, required: true }
});


// Exportar el modelo
module.exports = mongoose.model('usuarios', RegisterSchema);



