const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true
    },
    prenom: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    mot_de_passe: {
      type: String,
      required: true,
      trim: true
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    role: {
      type: String,
      enum: ["Admin", "Enseignant", "Etudiant"],
      required: true,
      default: "Etudiant",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = Utilisateur;