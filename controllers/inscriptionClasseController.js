const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const InscriptionClasse = require("../models/inscriptionClasseModel");
const Classe = require("../models/classeModel");
const Utilisateur = require("../models/actors/utilisateurModel");

// @desc    Create a new Inscription
// @route   POST /api/inscriptions
// @access  Private 'Admin only'
exports.addInscription = asyncHandler(async (req, res, next) => {
    const { classe_id, etudiant_id, annee_inscription } = req.body;

    const classe = await Classe.findById(classe_id);
    const etudiant = await Utilisateur.findById(etudiant_id);

    if (!classe) {
        return next(new ApiError(`Aucune classe trouvée pour l'identifiant: ${classe_id}`, 404));
    }

    if (!etudiant) {
        return next(new ApiError(`Aucun utilisateur trouvé pour l'identifiant: ${etudiant_id}`, 404));
    }

    if (etudiant.role !== "Etudiant") {
        return next(new ApiError(`L'utilisateur avec l'identifiant: ${etudiant_id} n'a pas le rôle "Etudiant"`, 400));
    }

    const existingInscription = await InscriptionClasse.findOne({
        etudiant_id,
        annee_inscription,
    });

    if (existingInscription) {
        return next(
            new ApiError(
                `L'étudiant avec l'identifiant: ${etudiant_id} est déjà inscrit dans une classe pour l'année ${annee_inscription}`,
                400
            )
        );
    }

    const inscription = await InscriptionClasse.create({
        classe_id,
        etudiant_id,
        annee_inscription,
    });

    res.status(201).json({ data: inscription });
});

// @desc    Get all Inscriptions
// @route   GET /api/inscriptions
// @access  Private 'Admin only'
exports.getAllInscriptions = asyncHandler(async (req, res, next) => {
    const inscriptions = await InscriptionClasse.find()
        .populate("classe_id", "nom")
        .populate("etudiant_id", "nom");

    res.status(200).json({
        result: inscriptions.length,
        data: inscriptions,
    });
});

// @desc    Get a specific Inscription by ID
// @route   GET /api/inscriptions/:id
// @access  Private 'Admin only'
exports.getInscriptionById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const inscription = await InscriptionClasse.findById(id)
        .populate("classe_id", "nom")
        .populate("etudiant_id", "nom");

    if (!inscription) {
        return next(new ApiError(`Aucune inscription trouvée pour l'identifiant: ${id}`, 404));
    }

    res.status(200).json({ data: inscription });
});

// @desc    Update a specific Inscription
// @route   PUT /api/inscriptions/:id
// @access  Private 'Admin only'
exports.updateInscription = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { classe_id, etudiant_id, annee_inscription } = req.body;

    const classe = await Classe.findById(classe_id);
    const etudiant = await Utilisateur.findById(etudiant_id);

    if (!classe) {
        return next(new ApiError(`Aucune classe trouvée pour l'identifiant: ${classe_id}`, 404));
    }

    if (!etudiant) {
        return next(new ApiError(`Aucun utilisateur trouvé pour l'identifiant: ${etudiant_id}`, 404));
    }

    if (etudiant.role !== "Etudiant") {
        return next(new ApiError(`L'utilisateur avec l'identifiant: ${etudiant_id} n'a pas le rôle "Etudiant"`, 400));
    }

    const updatedData = { classe_id, etudiant_id, annee_inscription };

    const inscription = await InscriptionClasse.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    })
        .populate("classe_id", "nom")
        .populate("etudiant_id", "nom");

    if (!inscription) {
        return next(new ApiError(`Aucune inscription trouvée pour l'identifiant: ${id}`, 404));
    }

    res.status(200).json({ data: inscription });
});

// @desc    Delete a specific Inscription
// @route   DELETE /api/inscriptions/:id
// @access  Private 'Admin only'
exports.deleteInscription = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const inscription = await InscriptionClasse.findByIdAndDelete(id);

    if (!inscription) {
        return next(new ApiError(`Aucune inscription trouvée pour l'identifiant: ${id}`, 404));
    }

    res.status(204).send();
});
