const mongoose = require("mongoose");

const matiereSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    parcours_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcours",
      required: true
    },
    nature: {
      type: String,
      required: true,
      trim: true
    },
    charge: {
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