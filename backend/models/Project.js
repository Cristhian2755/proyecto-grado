const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({

  titulo: String,

  problema: String,

  justificacion: String,

  objetivos: String,

  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  estado: {
    type: String,
    enum: ["propuesta", "aprobado", "en_revision", "finalizado"],
    default: "propuesta"
  },

  fechaCreacion: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Project", ProjectSchema);
