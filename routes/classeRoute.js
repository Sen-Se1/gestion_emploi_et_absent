const express = require("express");
const router = express.Router();
const {
    protect,
    allowedTo,
} = require("../middlewares/authMiddleware");

const {
    addNewClasse,
    getAllClasses,
    getClasseById,
    updateClasse,
    deleteClasse,
} = require("../controllers/classeController");

router.post("/", protect, allowedTo("Admin"), addNewClasse);

router.get("/", protect, allowedTo("Admin"), getAllClasses);

router.get("/:id", protect, allowedTo("Admin"), getClasseById);

router.put("/:id", protect, allowedTo("Admin"), updateClasse);

router.delete("/:id", protect, allowedTo("Admin"), deleteClasse);

module.exports = router;
