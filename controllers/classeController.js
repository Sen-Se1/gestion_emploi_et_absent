const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Classe = require("../models/classeModel");
const Parcours = require("../models/parcoursModel");

// @desc    Create a new Classe
// @route   POST /api/classes
// @access  Private 'Admin only'
exports.addNewClasse = asyncHandler(async (req, res, next) => {
    const { nom, annee_academique, parcours_id } = req.body;

    const parcours = await Parcours.findOne({ _id: parcours_id });
    if (!parcours) {
        return next(new ApiError(`Aucun parcours trouvé pour cet identifiant : ${parcours_id}`, 404));
    }

    const classe = await Classe.create({ nom, annee_academique, parcours_id });

    res.status(201).json({ data: classe });
});

// @desc    Get all Classes
// @route   GET /api/classes
// @access  Private 'Admin only'
exports.getAllClasses = asyncHandler(async (req, res, next) => {
    const classes = await Classe.find().populate("parcours_id", "nom");

    res.status(200).json({
        result: classes.length,
        data: classes,
    });
});

// @desc    Get a specific Classe by ID
// @route   GET /api/classes/:id
// @access  Private 'Admin only'
exports.getClasseById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const classe = await Classe.findById(id).populate("parcours_id", "nom");

    if (!classe) {
        return next(new ApiError(`Aucune classe trouvée pour cet identifiant : ${id}`, 404));
    }

    res.status(200).json({ data: classe });
});

// @desc    Update a specific Classe
// @route   PUT /api/classes/:id
// @access  Private 'Admin only'
exports.updateClasse = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { nom, annee_academique, parcours_id } = req.body;

    const parcours = await Parcours.findOne({ _id: parcours_id });
    if (!parcours) {
        return next(new ApiError(`Aucun parcours trouvé pour cet identifiant : ${parcours_id}`, 404));
    }

    const updatedData = { nom, annee_academique, parcours_id };

    const classe = await Classe.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    }).populate("parcours_id", "nom");

    if (!classe) {
        return next(new ApiError(`Aucune classe trouvée pour cet identifiant : ${id}`, 404));
    }

    res.status(200).json({ data: classe });
});

// @desc    Delete a specific Classe
// @route   DELETE /api/classes/:id
// @access  Private 'Admin only'
exports.deleteClasse = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const classe = await Classe.findByIdAndDelete(id);

    if (!classe) {
        return next(new ApiError(`Aucune classe trouvée pour cet identifiant : ${id}`, 404));
    }

    res.status(204).send();
});
