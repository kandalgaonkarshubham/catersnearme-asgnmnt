import "dotenv/config"
import express, { json } from "express"
import cors from "cors"
import catererRoutes from "./src/routes/caterers.js"

const app = express()

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
    ].filter(Boolean),
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  })
)

app.use(json())

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "CaterersNearMe API",
  })
})

app.use("/api/caterers", catererRoutes)

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  })
})

app.use((err, _req, res, _next) => {
  console.error(err)

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  })
})

export default app
