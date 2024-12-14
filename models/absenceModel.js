const mongoose = require("mongoose");

const absenceSchema = new mongoose.Schema(
  {
    etudiant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true
    },
    emploi_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmploiCours",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    justifie: {
      type: Boolean,
      required: true,
      default: false
    },
    motif: {
      type: String,
      trim: true,
      default: null
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Absence = mongoose.model("Absence", absenceSchema);

module.exports = Absence;