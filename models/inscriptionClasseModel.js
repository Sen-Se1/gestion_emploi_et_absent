const mongoose = require("mongoose");

const inscriptionClasseSchema = new mongoose.Schema(
  {
    classe_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classe",
      required: true
    },
    etudiant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true
    },
    annee_inscription: {
      type: String,
      required: true,
      trim: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InscriptionClasse = mongoose.model("InscriptionClasse", inscriptionClasseSchema);

module.exports = InscriptionClasse; 