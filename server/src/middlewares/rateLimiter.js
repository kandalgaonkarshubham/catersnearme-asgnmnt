import rateLimit from "express-rate-limit"

/**
 * POST /api/caterers to 15 requests per IP per 5 minutes.
 */
export const createCatererLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 15,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many caterer submissions from this IP. Please try again after 5 minutes.",
  },
})
