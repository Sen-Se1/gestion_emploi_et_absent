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
    date_inscription: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const InscriptionClasse = mongoose.model("InscriptionClasse", inscriptionClasseSchema);

module.exports = InscriptionClasse;