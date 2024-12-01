const mongoose = require("mongoose");

const salleSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    capacite: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Salle = mongoose.model("Salle", salleSchema);

module.exports = Salle;