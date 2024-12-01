const mongoose = require("mongoose");

const departementSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    directeur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Departement = mongoose.model("Departement", departementSchema);

module.exports = Departement;