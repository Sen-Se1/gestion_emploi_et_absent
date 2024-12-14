const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Utilisateur = require("../models/actors/utilisateurModel");

exports.protect = asyncHandler(async (req, res, next) => {

  let token;
  if (req.headers.authorization || req.headers.Authorization) {
    token = req.headers.authorization || req.headers.Authorization;
  }
  if (!token) {
    return next(
      new ApiError(
        "Vous n'êtes pas connecté, veuillez vous connecter pour accéder à cet itinéraire.",
        401
      )
    );
  }

  const decoded = jwt.verify(token, JWT_SECRET_KEY);

  const currentUser = await Utilisateur.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "L'utilisateur appartenant à ce token n'existe plus.",
        401
      )
    );
  }

  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );

    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "L'utilisateur a récemment modifié son mot de passe. veuillez vous reconnecter.",
          401
        )
      );
    }
  }
  delete currentUser._doc.mot_de_passe;
  req.user = currentUser;
  next();
});

exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("Vous n'êtes pas autorisé à accéder à cet itinéraire.", 403)
      );
    }
    next();
  });

exports.checkCurrentlyAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const currentlyAdmin = await Utilisateur.findOne({ _id: id });

  if (!currentlyAdmin) {
    return next(
      new ApiError(`Pas d'utilisateur pour cet identifiant : ${id}`, 404)
    );
  }
  if (currentlyAdmin._id.toString() == req.user._id.toString()) {
    return next(
      new ApiError(
        "Vous n'êtes pas autorisé à obtenir, mettre à jour ou supprimer votre profil et votre mot de passe sur cet itinéraire.",
        403
      )
    );
  }
  if (currentlyAdmin.role === "Admin") {
    return next(
      new ApiError(
        "Vous n'êtes pas autorisé à obtenir, mettre à jour ou supprimer un administrateur sur cette route.",
        403
      )
    );
  }
  next();
});

exports.isProfileOwner = asyncHandler((req, res, next) => {
  const userId = req.user.id;
  const profileId = req.params.id;

  if (userId === profileId) {
    next();
  } else {
    return next(
      new ApiError(
        "Vous n'êtes pas autorisé à afficher et modifier un profil dont vous n'êtes pas propriétaire.",
        403
      )
    );
  }
});