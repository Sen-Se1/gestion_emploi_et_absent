const mongoose = require("mongoose");

const logModificationSchema = new mongoose.Schema(
  {
    utilisateur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true
    },
    action: {
      type: String,
      required: true,
      trim: true
    },
    date_modification: {
      type: Date,
      default: Date.now
    },
    details: {
      type: String,
      trim: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LogModification = mongoose.model("LogModification", logModificationSchema);

module.exports = LogModification; 