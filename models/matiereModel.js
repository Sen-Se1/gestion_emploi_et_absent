const mongoose = require("mongoose");

const matiereSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true
    },
    Parcours: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcours",
      required: true
    },
    Nature: {
      type: String,
      required: true,
      trim: true
    },
    Charge: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Matiere = mongoose.model("Matiere", matiereSchema);

module.exports = Matiere;