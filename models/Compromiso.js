const mongoose = require('mongoose');

const compromisoSchema = new mongoose.Schema({
  nombreLider: { type: String, required: true },
  descripcion: { type: String, required: true },
  responsable: { type: String, required: true },
  correoResponsable: { type: String, required: true },
  municipio: { type: String, required: true },
  observaciones: { type: String },
  fechaCreacion: { type: Date, default: Date.now },
  estado: { type: String, enum: ['Activo', 'Pendiente', 'Vencido', 'Cumplido'], default: 'Activo' }
});

module.exports = mongoose.model('Compromiso', compromisoSchema);
