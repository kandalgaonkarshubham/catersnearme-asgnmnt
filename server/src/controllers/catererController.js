import Caterer from "../models/Caterer.js"

export const getCaterers = async (req, res, next) => {
  try {
    const {
      name,
      maxPrice,
      minPrice,
      city,
      cuisines,
      isVeg,
    } = req.query

    const filter = {}

    if (name) {
      filter.name = { $regex: name, $options: "i" }
    }

    if (minPrice || maxPrice) {
      filter.pricePerPlate = {}
      if (minPrice) filter.pricePerPlate.$gte = Number(minPrice)
      if (maxPrice) filter.pricePerPlate.$lte = Number(maxPrice)
    }

    if (city) {
      filter["location.city"] = { $regex: city, $options: "i" }
    }

    if (cuisines) {
      const cuisineList = cuisines.split(",").map(c => c.trim())
      filter.cuisines = { $in: cuisineList }
    }

    if (isVeg !== undefined) {
      filter.isVeg = isVeg === "true"
    }

    const caterers = await Caterer.find(filter)
      .sort({ rating: -1, reviewCount: -1 })
      .lean()

    res.json({
      success: true,
      data: caterers,
    })
  } catch (err) {
    next(err)
  }
}

export const getCatererById = async (req, res, next) => {
  try {
    const caterer = await Caterer.findById(req.params.id).lean()

    if (!caterer) {
      return res.status(404).json({
        success: false,
        message: `Caterer with id '${req.params.id}' not found.`,
      })
    }

    res.json({ success: true, data: caterer })
  } catch (err) {
    // Invalid ObjectId format
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid caterer ID format.",
      })
    }
    next(err)
  }
}

export const createCaterer = async (req, res, next) => {
  try {
    const caterer = await Caterer.create(req.body)

    res.status(201).json({
      success: true,
      message: "Caterer created successfully.",
      data: caterer,
    })
  } catch (err) {
    // Duplicate key or Mongoose validation errors
    if (err.code === 11000 || err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: err.message,
      })
    }
    next(err)
  }
}
