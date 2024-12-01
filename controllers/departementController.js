const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Departement = require("../models/departementModel");
const Utilisateur = require("../models/actors/utilisateurModel");


// @desc    Create a new Departement
// @route   POST /api/departements
// @access  Private 'Admin only'
exports.addNewDepartement = asyncHandler(async (req, res, next) => {
    const { nom, directeur_id } = req.body;

    const utilisateur = await Utilisateur.findOne({ _id: directeur_id, role: 'Admin' });
    if (!utilisateur) {
        return next(new ApiError(`Aucun directeur trouvé pour cet identifiant : ${directeur_id}`, 401));
    }

    const departement = await Departement.create({ nom, directeur_id });

    res.status(201).json({ data: departement });
});

// @desc    Get all Departements
// @route   GET /api/departements
// @access  Private 'Admin only'
exports.getAllDepartements = asyncHandler(async (req, res, next) => {
    const departements = await Departement.find().populate("directeur_id", "nom prenom email");

    res.status(200).json({
        result: departements.length,
        data: departements,
    });
});

// @desc    Get a specific Departement by ID
// @route   GET /api/departements/:id
// @access  Private 'Admin only'
exports.getDepartementById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const departement = await Departement.findById(id).populate("directeur_id", "nom prenom email");

    if (!departement) {
        return next(new ApiError(`Aucun département trouvé pour cet identifiant : ${id}`, 404));
    }

    res.status(200).json({ data: departement });
});

// @desc    Update a specific Departement
// @route   PUT /api/departements/:id
// @access  Private 'Admin only'
exports.updateDepartement = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { nom, directeur_id } = req.body;

    const utilisateur = await Utilisateur.findOne({ _id: directeur_id, role: 'Admin' });
    if (!utilisateur) {
        return next(new ApiError(`Aucun directeur trouvé pour cet identifiant : ${directeur_id}`, 401));
    }

    const updatedData = { nom, directeur_id };

    const departement = await Departement.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    }).populate("directeur_id", "nom prenom email");

    if (!departement) {
        return next(new ApiError(`Aucun département trouvé pour cet identifiant : ${id}`, 404));
    }

    res.status(200).json({ data: departement });
});

// @desc    Delete a specific Departement
// @route   DELETE /api/departements/:id
// @access  Private 'Admin only'
exports.deleteDepartement = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const departement = await Departement.findByIdAndDelete(id);

    if (!departement) {
        return next(new ApiError(`Aucun département trouvé pour cet identifiant : ${id}`, 404));
    }

    res.status(204).send();
});
