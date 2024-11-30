const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true
    },
    annee_academique: {
      type: String,
      required: true,
      trim: true
    },
    Parcours: {
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