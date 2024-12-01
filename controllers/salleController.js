const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Salle = require("../models/salleModel");

// @desc    Create a new Salle
// @route   POST /api/salles
// @access  Private 'Admin only'
exports.addNewSalle = asyncHandler(async (req, res, next) => {
    const { nom, type, capacite } = req.body;

    const salle = await Salle.create({ nom, type, capacite });

    res.status(201).json({ data: salle });
});

// @desc    Get all Salles
// @route   GET /api/salles
// @access  Private 'Admin only'
exports.getAllSalles = asyncHandler(async (req, res, next) => {
    const salles = await Salle.find();

    res.status(200).json({
        result: salles.length,
        data: salles,
    });
});

// @desc    Get a specific Salle by ID
// @route   GET /api/salles/:id
// @access  Private 'Admin only'
exports.getSalleById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const salle = await Salle.findById(id);

    if (!salle) {
        return next(new ApiError(`Aucune salle trouvée pour cet identifiant : ${id}`, 404));
    }

    res.status(200).json({ data: salle });
});

// @desc    Update a specific Salle
// @route   PUT /api/salles/:id
// @access  Private 'Admin only'
exports.updateSalle = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { nom, type, capacite } = req.body;

    const updatedData = { nom, type, capacite };

    const salle = await Salle.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });

    if (!salle) {
        return next(new ApiError(`Aucune salle trouvée pour cet identifiant : ${id}`, 404));
    }

    res.status(200).json({ data: salle });
});

// @desc    Delete a specific Salle
// @route   DELETE /api/salles/:id
// @access  Private 'Admin only'
exports.deleteSalle = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const salle = await Salle.findByIdAndDelete(id);

    if (!salle) {
        return next(new ApiError(`Aucune salle trouvée pour cet identifiant : ${id}`, 404));
    }

    res.status(204).send();
});
