import { z } from "zod"

export const createCatererSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .trim(),

  location: z.object({
    city: z.string().min(2, "City must be at least 2 characters").trim(),
    area: z.string().min(2, "Area must be at least 2 characters").trim(),
  }),

  pricePerPlate: z
    .number({ required_error: "pricePerPlate is required" })
    .positive("pricePerPlate must be a positive number"),

  cuisines: z
    .array(z.string().trim())
    .min(1, "At least one cuisine is required"),

  rating: z.number().min(0).max(5).optional().default(0),
  reviewCount: z.number().int().min(0).optional().default(0),
  isVeg: z.boolean().optional().default(false),
  experience: z.number().int().min(0).optional(),
  minGuests: z.number().int().min(1).optional(),
  maxGuests: z.number().int().min(1).optional(),
  tagline: z.string().max(200).optional(),
})

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const errors = result.error.flatten()
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.fieldErrors,
        formErrors: errors.formErrors,
      })
    }

    req.body = result.data
    next()
  }
}
