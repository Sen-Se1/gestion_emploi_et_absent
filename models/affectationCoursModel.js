const mongoose = require("mongoose");

const affectationCoursSchema = new mongoose.Schema(
  {
    enseignant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enseignant",
      required: true
    },
    matieres: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Matiere",
      required: true
    },
    charge_edu: {
      type: Number,
      required: true
    },
    AU: {
      type: Number,
      required: true
    },
    semestre: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AffectationCours = mongoose.model("AffectationCours", affectationCoursSchema);

module.exports = AffectationCours;