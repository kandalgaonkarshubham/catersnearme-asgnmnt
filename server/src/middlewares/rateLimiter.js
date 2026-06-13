import rateLimit from "express-rate-limit"

/**
 * POST /api/caterers to 5 requests per IP per 15 minutes.
 */
export const createCatererLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many caterer submissions from this IP. Please try again after 15 minutes.",
  },
})
