const mongoose = require("mongoose");

const absenceSchema = new mongoose.Schema(
  {
    etudiant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true
    },
    Emploi_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmploiCours",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    justifie: {//false 
      type: Boolean,
      required: true
    },
    motif: {//null 
      type: String,
      trim: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Absence = mongoose.model("Absence", absenceSchema);

module.exports = Absence;