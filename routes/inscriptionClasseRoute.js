const express = require("express");
const router = express.Router();
const { protect, allowedTo } = require("../middlewares/authMiddleware");

const {
    addInscription,
    getAllInscriptions,
    getInscriptionById,
    updateInscription,
    deleteInscription,
} = require("../controllers/inscriptionClasseController");

router.post("/", protect, allowedTo("Admin"), addInscription);
router.get("/", protect, allowedTo("Admin"), getAllInscriptions);
router.get("/:id", protect, allowedTo("Admin"), getInscriptionById);
router.put("/:id", protect, allowedTo("Admin"), updateInscription);
router.delete("/:id", protect, allowedTo("Admin"), deleteInscription);

module.exports = router;
