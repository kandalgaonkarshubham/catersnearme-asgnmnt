import mongoose from "mongoose"

const catererSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: true },
  location: {
    city: { type: String, required: true },
    area: { type: String, required: true },
  },
  pricePerPlate: { type: Number, required: true, min: 0 },
  cuisines: [{ type: String }],
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviewCount: { type: Number, min: 0, default: 0 },
  isVeg: { type: Boolean, default: false },
  experience: { type: Number, min: 0 },
  minGuests: { type: Number, min: 1 },
  maxGuests: { type: Number, min: 1 },
  tagline: { type: String },
}, { timestamps: true })

export default mongoose.model("Caterer", catererSchema)
