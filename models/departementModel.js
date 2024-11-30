const mongoose = require("mongoose");

const departementSchema = new mongoose.Schema(
  {
    Nom: {
      type: String,
      required: true,
      trim: true
    },
    Directeur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur"
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Departement = mongoose.model("Departement", departementSchema);

module.exports = Departement;