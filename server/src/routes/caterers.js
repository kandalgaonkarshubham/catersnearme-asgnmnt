import { Router } from "express"
import {
  getCaterers,
  getCatererById,
  createCaterer,
} from "../controllers/catererController.js"
import { validateBody, createCatererSchema } from "../middlewares/validate.js"
import { createCatererLimiter } from "../middlewares/rateLimiter.js"

const router = Router()

router.get("/", getCaterers)

router.get("/:id", getCatererById)

router.post(
  "/",
  createCatererLimiter,
  validateBody(createCatererSchema),
  createCaterer
)

export default router
