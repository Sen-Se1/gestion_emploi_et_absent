const express = require("express");
const router = express.Router();
const {
    protect,
    allowedTo,
} = require("../middlewares/authMiddleware");

const {
    addNewSalle,
    getAllSalles,
    getSalleById,
    updateSalle,
    deleteSalle,
} = require("../controllers/salleController");


router.post("/", protect, allowedTo("Admin"), addNewSalle);

router.get("/", protect, allowedTo("Admin"), getAllSalles);

router.get("/:id", protect, allowedTo("Admin"), getSalleById);

router.put("/:id", protect, allowedTo("Admin"), updateSalle);

router.delete("/:id", protect, allowedTo("Admin"), deleteSalle);

module.exports = router;
