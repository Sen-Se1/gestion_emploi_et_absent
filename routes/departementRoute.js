const express = require("express");
const router = express.Router();
const {
    protect,
    allowedTo,
} = require("../middlewares/authMiddleware");

const {
    addNewDepartement,
    getAllDepartements,
    getDepartementById,
    updateDepartement,
    deleteDepartement,
} = require("../controllers/departementController");

router.post("/", protect, allowedTo("Admin"), addNewDepartement);

router.get("/", protect, allowedTo("Admin"), getAllDepartements);

router.get("/:id", protect, allowedTo("Admin"), getDepartementById);

router.put("/:id", protect, allowedTo("Admin"), updateDepartement);

router.delete("/:id", protect, allowedTo("Admin"), deleteDepartement);

module.exports = router;
