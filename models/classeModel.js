const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    annee_academique: {
      type: String,
      required: true,
      trim: true
    },
    parcours_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcours",
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Classe = mongoose.model("Classe", classeSchema);

module.exports = Classe;