const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Parcours = require("../models/parcoursModel");
const Departement = require("../models/departementModel");

// @desc    Create a new Parcours
// @route   POST /api/parcours
// @access  Private 'Admin only'
exports.addNewParcours = asyncHandler(async (req, res, next) => {
    const { nom, departement_id } = req.body;

    const departement = await Departement.findOne({ _id: departement_id });
    if (!departement) {
        return next(new ApiError(`Aucun departement trouvé pour cet identifiant : ${departement_id}`, 401));
    }

    const parcours = await Parcours.create({ nom, departement_id });

    res.status(201).json({ data: parcours });
});

// @desc    Get all Parcours
// @route   GET /api/parcours
// @access  Private 'Admin only'
exports.getAllParcours = asyncHandler(async (req, res, next) => {
    const parcours = await Parcours.find().populate("departement_id", "nom");

    res.status(200).json({
        result: parcours.length,
        data: parcours,
    });
});

// @desc    Get a specific Parcours by ID
// @route   GET /api/parcours/:id
// @access  Private 'Admin only'
exports.getParcoursById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const parcours = await Parcours.findById(id).populate("departement_id", "nom");

    if (!parcours) {
        return next(new ApiError(`Aucun parcours trouvé pour cet identifiant : ${id}`, 404));
    }

    res.status(200).json({ data: parcours });
});

// @desc    Update a specific Parcours
// @route   PUT /api/parcours/:id
// @access  Private 'Admin only'
exports.updateParcours = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { nom, departement_id } = req.body;

    const departement = await Departement.findOne({ _id: departement_id });
    if (!departement) {
        return next(new ApiError(`Aucun departement trouvé pour cet identifiant : ${departement_id}`, 401));
    }

    const updatedData = { nom, departement_id };

    const parcours = await Parcours.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    }).populate("departement_id", "nom");

    if (!parcours) {
        return next(new ApiError(`Aucun parcours trouvé pour cet identifiant : ${id}`, 404));
    }

    res.status(200).json({ data: parcours });
});

// @desc    Delete a specific Parcours
// @route   DELETE /api/parcours/:id
// @access  Private 'Admin only'
exports.deleteParcours = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const parcours = await Parcours.findByIdAndDelete(id);

    if (!parcours) {
        return next(new ApiError(`Aucun parcours trouvé pour cet identifiant : ${id}`, 404));
    }

    res.status(204).send();
});
