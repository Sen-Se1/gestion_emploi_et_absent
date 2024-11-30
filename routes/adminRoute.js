const express = require("express");
const router = express.Router();
const {
    protect,
    allowedTo,
    checkCurrentlyAdmin,
} = require("../middlewares/authMiddleware");

const {
    addNewUser,
    getAllEtudiants,
    getAllEnseignants,
    getByIdEtudiantEnseignant,
    updateEtudiantEnseignant,
    updatePwdEtudiantEnseignant,
    deleteEtudiantEnseignant,
} = require("../controllers/adminController");

router.post(
    "/",
    protect,
    allowedTo("Admin"),
    addNewUser
);

router.get(
    "/etudiant",
    protect,
    allowedTo("Admin"),
    getAllEtudiants
);

router.get(
    "/enseignant",
    protect,
    allowedTo("Admin"),
    getAllEnseignants
);

// admin can't get, update or delete yourself in this case
router.get(
    "/:id",
    protect,
    allowedTo("Admin"),
    checkCurrentlyAdmin,
    getByIdEtudiantEnseignant
);

router.put(
    "/:id",
    protect,
    allowedTo("Admin"),
    checkCurrentlyAdmin,
    updateEtudiantEnseignant
);

router.put(
    "/password/:id",
    protect,
    allowedTo("Admin"),
    checkCurrentlyAdmin,
    updatePwdEtudiantEnseignant
);

router.delete(
    "/:id",
    protect,
    allowedTo("Admin"),
    checkCurrentlyAdmin,
    deleteEtudiantEnseignant
);

module.exports = router;