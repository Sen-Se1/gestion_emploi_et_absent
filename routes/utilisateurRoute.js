const express = require("express");
const router = express.Router();
const {
    protect,
    isProfileOwner,
} = require("../middlewares/authMiddleware");
const {
    register,
    login,
    forgotPassword,
    resetPassword,
    getProfile,
    updateProfile,
    updateProfilePwd,
} = require("../controllers/utilisateurController");

router.post("/register", register);
router.post("/login", login);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:token', resetPassword);

// only login user is allowed
router.get(
    "/:id",
    protect,
    isProfileOwner,
    getProfile
);

router.put(
    "/:id",
    protect,
    isProfileOwner,
    updateProfile
);

router.put(
    "/password/:id",
    protect,
    isProfileOwner,
    updateProfilePwd
);

module.exports = router;