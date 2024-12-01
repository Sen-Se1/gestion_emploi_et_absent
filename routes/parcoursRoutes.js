const express = require("express");
const router = express.Router();
const {
    protect,
    allowedTo,
} = require("../middlewares/authMiddleware");

const {
    addNewParcours,
    getAllParcours,
    getParcoursById,
    updateParcours,
    deleteParcours,
} = require("../controllers/parcoursController");

router.post("/", protect, allowedTo("Admin"), addNewParcours);

router.get("/", protect, allowedTo("Admin"), getAllParcours);

router.get("/:id", protect, allowedTo("Admin"), getParcoursById);

router.put("/:id", protect, allowedTo("Admin"), updateParcours);

router.delete("/:id", protect, allowedTo("Admin"), deleteParcours);

module.exports = router;
