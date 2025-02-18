const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    idNombre: { type: String, required: true },
    idEmail: { type: String, required: true, unique: true },
    idContra: { type: String, required: true }
});

module.exports = mongoose.model('admins', AdminSchema);