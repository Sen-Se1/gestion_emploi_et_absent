const mongoose = require("mongoose");

const parcoursSchema = new mongoose.Schema(
  {
    Nom: {
      type: String,
      required: true,
      trim: true
    },
    Departement_id: {
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