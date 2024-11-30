const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Utilisateur = require("../models/actors/utilisateurModel");
const Enseignant = require("../models/actors/enseignantModel");
const createToken = require("../utils/createToken");
const ApiError = require("../utils/apiError");
const sendEmail = require("../utils/sendEmail");

// @desc    Register new user
// @route   POST /api/utilisateur/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { nom, prenom, email, mot_de_passe, role } = req.body;

    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
        return next(new ApiError("Cet email est déjà utilisé", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);

    const utilisateur = await Utilisateur.create({
        nom,
        prenom,
        email,
        mot_de_passe: hashedPassword,
        role,
    });

    const token = createToken({
        id: utilisateur._id,
        role: utilisateur.role,
    });

    delete utilisateur._doc.mot_de_passe;

    res.status(201).json({ data: utilisateur, token });
});

// @desc    Login user
// @route   POST /api/utilisateur/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, mot_de_passe } = req.body;

    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
        return next(new ApiError("email ou mot de passe incorrect", 401));
    }

    const isPasswordCorrect = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!isPasswordCorrect) {
        return next(new ApiError("email ou mot de passe incorrect", 401));
    }

    const token = createToken({
        id: utilisateur._id,
        role: utilisateur.role,
    });

    delete utilisateur._doc.mot_de_passe;

    res.status(200).json({ data: utilisateur, token });
});

// @desc    Forgot password
// @route   POST /api/utilisateur/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const utilisateur = await Utilisateur.findOne({ email: req.body.email });
    if (!utilisateur) {
        return next(
            new ApiError(`Il n'y a aucun utilisateur avec cette adresse e-mail: ${req.body.email}`, 404)
        );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    utilisateur.passwordResetToken = hashedResetToken;
    // Add expiration time for password reset Token (5 min)
    utilisateur.passwordResetTokenExpires = Date.now() + 5 * 60 * 1000;
    await utilisateur.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`;
    console.log(resetUrl);

    // const resetUrl = `${req.protocol}://stage-2-front-end.vercel.app/reset-password/${resetToken}`;
    const message = `<h4>Salut ${utilisateur.nom}</h4>Nous avons reçu une demande de réinitialisation
                    du mot de passe de votre compte du tableau de bord d'administration. Veuillez utiliser 
                    le lien ci-dessous pour réinitialiser votre mot de passe <br><a href='${resetUrl}'>Votre lien</a><br>
                    Ce lien de réinitialisation du mot de passe ne sera valide que pendant 5 minutes. 
                    <br> Merci de nous aider à sécuriser votre compte.`;
    try {
        await sendEmail({
            email: utilisateur.email,
            subject: 'Votre code de réinitialisation de mot de passe (valable 5 min)',
            message,
        });
    } catch (err) {
        utilisateur.passwordResetToken = undefined;
        utilisateur.passwordResetTokenExpires = undefined;
        await utilisateur.save();
        return next(new ApiError("Il y a une erreur lors de l'envoi de l'e-mail", 500));
    }

    res.status(200).json({ message: 'Lien de réinitialisation du mot de passe envoyé à votre adresse e-mail' });
});

// @desc    Reset password
// @route   PUT /api/utilisateur/resetPassword/:token
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // 1) Get user based on reset token
    const hashedResetToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const utilisateur = await Utilisateur.findOne({
        passwordResetToken: hashedResetToken,
        passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!utilisateur) {
        return next(new ApiError("Le jeton n'est pas valide ou a expiré", 400));
    }
    // 2) hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, salt);

    utilisateur.mot_de_passe = hashedPassword;
    utilisateur.passwordChangedAt = Date.now();
    utilisateur.passwordResetToken = undefined;
    utilisateur.passwordResetTokenExpires = undefined;

    await utilisateur.save();

    res.status(200).json({ message: 'Votre mot de passe a été réinitialisé avec succès' });
});

// @desc    Get specific profile
// @route   GET /api/utilisateur/:id
// @access  Private
exports.getProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const profile = await Utilisateur.findOne({ _id: id });
    if (!profile) {
        return next(new ApiError(`Aucun profil pour cet identifiant : ${id}`, 404));
    }
    delete profile._doc.mot_de_passe;
    res.status(200).json({ data: profile });
});

// @desc    Update specific profile
// @route   PUT /api/utilisateur/:id
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const {
        nom,
        prenom,
        email,
        departementID,
        specialisation,
        grade,
        date_embauche
    } = req.body;

    let newData;
    let utilisateur;
    if (req.user.role === 'Enseignant') {
        newData = {
            nom,
            prenom,
            email,
            departementID,
            specialisation,
            grade,
            date_embauche
        };

        utilisateur = await Enseignant.findOneAndUpdate({ _id: id }, newData, {
            new: true,
        });

    } else {
        newData = {
            nom,
            prenom,
            email,
        };

        utilisateur = await Utilisateur.findOneAndUpdate({ _id: id }, newData, {
            new: true,
        });
    }

    if (!utilisateur) {
        return next(new ApiError(`Aucun profil pour cet identifiant : ${id}`, 404));
    }
    delete utilisateur._doc.mot_de_passe;
    res.status(200).json({ data: utilisateur });
});

// @desc    Update logged user password
// @route   PUT /api/utilisateur/password/:id
// @access  Private
exports.updateProfilePwd = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, salt);

    const newData = {
        mot_de_passe: hashedPassword,
        passwordChangedAt: Date.now(),
    };
    
    let utilisateur;
    if (req.user.role === 'Enseignant') {
        utilisateur = await Enseignant.findOneAndUpdate({ _id: id }, newData, {
            new: true,
        });

    } else {
        utilisateur = await Utilisateur.findOneAndUpdate({ _id: id }, newData, {
            new: true,
        });
    }
    

    if (!utilisateur) {
        return next(new ApiError(`Aucun profil pour cet identifiant : ${id}`, 404));
    }

    const token = createToken({
        id: utilisateur._id,
        role: utilisateur.role,
    });

    delete utilisateur._doc.mot_de_passe;

    res.status(200).json({ data: utilisateur, token });
});