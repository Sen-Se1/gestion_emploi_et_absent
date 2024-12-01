const express = require("express");
const router = express.Router();
const { protect, allowedTo } = require("../middlewares/authMiddleware");

const {
    addNewMatiere,
    getAllMatieres,
    getMatiereById,
    updateMatiere,
    deleteMatiere,
} = require("../controllers/matiereController");


router.post("/", protect, allowedTo("Admin"), addNewMatiere);
router.get("/", protect, allowedTo("Admin"), getAllMatieres);
router.get("/:id", protect, allowedTo("Admin"), getMatiereById);
router.put("/:id", protect, allowedTo("Admin"), updateMatiere);
router.delete("/:id", protect, allowedTo("Admin"), deleteMatiere);

module.exports = router;
