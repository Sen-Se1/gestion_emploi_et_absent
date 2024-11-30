const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/apiError");
const Etudiant = require("../models/actors/utilisateurModel");
const Enseignant = require("../models/actors/enseignantModel");

// @desc    Add New User ["Enseignant", "Etudiant"]
// @route   POST /api/admin
// @access  Private 'Admin only'
exports.addNewUser = asyncHandler(async (req, res, next) => {
    const {
        nom,
        prenom,
        email,
        mot_de_passe,
        role,
        departementID,
        specialisation,
        grade,
        date_embauche
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);
    let utilisateur;

    if (role === 'Enseignant') {
        utilisateur = await Enseignant.create({
            nom,
            prenom,
            email,
            mot_de_passe: hashedPassword,
            role,
            departementID,
            specialisation,
            grade,
            date_embauche
        });
    } else {
        utilisateur = await Etudiant.create({
            nom,
            prenom,
            email,
            mot_de_passe: hashedPassword,
            role,
        });
    }

    delete utilisateur._doc.mot_de_passe;

    res.status(201).json({ data: utilisateur });
});

// @desc    Get All Etudiants
// @route   GET /api/admin/etudiant
// @access  Private 'Admin only'
exports.getAllEtudiants = asyncHandler(async (req, res, next) => {

    const etudiantCount = await Etudiant.countDocuments({ role: "Etudiant" });
    const Etudiants = await Etudiant.find({ role: "Etudiant" });

    Etudiants.forEach((etudiant) => {
        delete etudiant._doc.mot_de_passe;
    });

    res.status(200).json({
        result: { etudiantCount: etudiantCount },
        data: { Etudiants: Etudiants },
    });
});

// @desc    Get All Enseignants
// @route   GET /api/admin/enseignant
// @access  Private 'Admin only'
exports.getAllEnseignants = asyncHandler(async (req, res, next) => {

    const enseignantCount = await Enseignant.countDocuments({ role: "Enseignant" });
    const Enseignants = await Enseignant.find({ role: "Enseignant" });

    Enseignants.forEach((enseignant) => {
        delete enseignant._doc.mot_de_passe;
    });

    res.status(200).json({
        result: { enseignantCount: enseignantCount },
        data: { Enseignants: Enseignants },
    });
});

// @desc    Get specific Etudiant or Enseignant
// @route   GET /api/admin/:id
// @access  Private 'Admin only'
exports.getByIdEtudiantEnseignant = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const utilisateur = await Etudiant.findOne({ _id: id });

    if (!utilisateur) {
        return next(new ApiError(`Aucun etudiant ou enseignant pour cet identifiant : ${id}`, 404));
    }

    delete utilisateur._doc.mot_de_passe;

    res.status(200).json({ data: utilisateur });
});

// @desc    Update specific Etudiant or Enseignant
// @route   PUT /api/admin/:id
// @access  Private 'Admin only'
exports.updateEtudiantEnseignant = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { nom, prenom, email, role } = req.body;

    const utilisateur = await Etudiant.findById(id);

    if (!utilisateur) {
        return next(
            new ApiError(`Aucun utilisateur trouvé pour cet identifiant : ${id}`, 404)
        );
    }

    if (utilisateur.role !== role) {
        const updateData = { nom, prenom, email, role };

        if (role === 'Etudiant') {
            const updatedUser = await Enseignant.findOneAndUpdate(
                { _id: id },
                {
                    $unset: {
                        departementID: "",
                        specialisation: "",
                        grade: "",
                        date_embauche: "",
                    },
                    $set: updateData,
                },
                {
                    new: true,
                }
            );

            delete updatedUser._doc.mot_de_passe;
            return res.status(200).json({ data: updatedUser });
        } else if (role === 'Enseignant') {
            const { departementID, specialisation, grade, date_embauche } = req.body;

            if (!departementID || !specialisation || !grade || !date_embauche) {
                return next(
                    new ApiError(
                        "Les champs departementID, specialisation, grade, et date_embauche sont obligatoires pour le rôle Enseignant",
                        400
                    )
                );
            }

            Object.assign(updateData, {
                departementID,
                specialisation,
                grade,
                date_embauche,
            });

            const updatedUser = await Enseignant.findByIdAndUpdate({ _id: id }, { $set: updateData }, {
                new: true,
            });
            delete updatedUser._doc.mot_de_passe;
            return res.status(200).json({ data: updatedUser });
        } else {
            return next(new ApiError(`Rôle non pris en charge : ${role}`, 400));
        }
    }

    let updatedUser;
    const updatedData = { nom, prenom, email };

    if (role === 'Enseignant') {
        const { departementID, specialisation, grade, date_embauche } = req.body;
        Object.assign(updatedData, { departementID, specialisation, grade, date_embauche });

        updatedUser = await Enseignant.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
    } else {
        updatedUser = await Etudiant.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
    }

    if (!updatedUser) {
        return next(new ApiError(`Impossible de mettre à jour l'utilisateur`, 500));
    }

    delete updatedUser._doc.mot_de_passe;
    res.status(200).json({ data: updatedUser });

});

// @desc    Update password specific for Etudiant or Enseignant
// @route   PUT /api/admin/password/:id
// @access  Private 'Admin only'
exports.updatePwdEtudiantEnseignant = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, salt);

    const newData = {
        mot_de_passe: hashedPassword,
        passwordChangedAt: Date.now(),
    };

    const utilisateur = await Etudiant.findOneAndUpdate({ _id: id }, newData, {
        new: true,
    });

    if (!utilisateur) {
        return next(
            new ApiError(`Aucun etudiant ou enseignant pour cet identifiant : ${id}`, 404)
        );
    }
    delete utilisateur._doc.mot_de_passe;

    res.status(200).json({ data: utilisateur });
});

// @desc    Delete specific Etudiant or Enseignant
// @route   DELETE /api/admin/:id
// @access  Private 'Admin only'
exports.deleteEtudiantEnseignant = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const utilisateur = await Etudiant.findOneAndDelete({ _id: id });

    if (!utilisateur) {
        return next(
            new ApiError(`Aucun etudiant ou enseignant pour cet identifiant : ${id}`, 404)
        );
    }

    res.status(204).send();
});