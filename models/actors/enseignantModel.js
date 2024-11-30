const mongoose = require("mongoose");
const Utilisateur = require("./utilisateurModel");

const enseignantSchema = new mongoose.Schema(
  {
    departementID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departement",
      required: true
    },
    specialisation: {
      type: String,
      required: true,
      trim: true
    },
    grade: {
      type: String,
      required: true,
      trim: true
    },
    date_embauche: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Enseignant = Utilisateur.discriminator("Enseignant", enseignantSchema);

module.exports = Enseignant;