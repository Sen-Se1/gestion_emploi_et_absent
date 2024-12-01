const mongoose = require("mongoose");

const parcoursSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    departement_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departement",
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Parcours = mongoose.model("Parcours", parcoursSchema);

module.exports = Parcours;