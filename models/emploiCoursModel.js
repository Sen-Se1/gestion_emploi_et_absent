const mongoose = require("mongoose");

const emploiCoursSchema = new mongoose.Schema(
  {
    classe_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: true
    },
    enseignant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      required: true
    },
    salle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salle",
      required: true
    },
    matiere_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matiere",
      required: true
    },
    jour: {
      type: String,
      required: true
    },
    heure_debut: {
      type: String,
      required: true
    },
    heure_fin: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const EmploiCours = mongoose.model("EmploiCours", emploiCoursSchema);

module.exports = EmploiCours;