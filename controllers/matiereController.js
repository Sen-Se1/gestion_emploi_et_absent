const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Parcours = require("../models/parcoursModel");
const Matiere = require("../models/matiereModel");

// @desc    Create a new Matiere
// @route   POST /api/matieres
// @access  Private 'Admin only'
exports.addNewMatiere = asyncHandler(async (req, res, next) => {
    const { nom, parcours_id, nature, charge } = req.body;
  
    const parcours = await Parcours.findById(parcours_id)

    if (!parcours) {
        return next(new ApiError(`Aucun parcours trouvé pour cet identifiant : ${parcours_id}`, 404));
    }

    const matiere = await Matiere.create({ nom, parcours_id, nature, charge });

    res.status(201).json({ data: matiere });
});

// @desc    Get all Matieres
// @route   GET /api/matieres
// @access  Private 'Admin only'
exports.getAllMatieres = asyncHandler(async (req, res, next) => {
    const matieres = await Matiere.find().populate("parcours_id", "nom");

    res.status(200).json({
        result: matieres.length,
        data: matieres,
    });
});

// @desc    Get a specific Matiere by ID
// @route   GET /api/matieres/:id
// @access  Private 'Admin only'
exports.getMatiereById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const matiere = await Matiere.findById(id).populate("parcours_id", "nom");

    if (!matiere) {
        return next(new ApiError(`Aucun Matiere trouvé pour l'identifiant: ${id}`, 404));
    }

    res.status(200).json({ data: matiere });
});

// @desc    Update a specific Matiere
// @route   PUT /api/matieres/:id
// @access  Private 'Admin only'
exports.updateMatiere = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { nom, parcours_id, nature, charge } = req.body;

    const parcours = await Parcours.findById(parcours_id)

    if (!parcours) {
        return next(new ApiError(`Aucun parcours trouvé pour cet identifiant : ${parcours_id}`, 404));
    }

    const updatedData = { nom, parcours_id, nature, charge };

    const matiere = await Matiere.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    }).populate("parcours_id", "nom");

    if (!matiere) {
        return next(new ApiError(`Aucun Matiere trouvé pour l'identifiant: ${id}`, 404));
    }

    res.status(200).json({ data: matiere });
});

// @desc    Delete a specific Matiere
// @route   DELETE /api/matieres/:id
// @access  Private 'Admin only'
exports.deleteMatiere = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const matiere = await Matiere.findByIdAndDelete(id);

    if (!matiere) {
        return next(new ApiError(`Aucun Matiere trouvé pour l'identifiant: ${id}`, 404));
    }

    res.status(204).send();
});
