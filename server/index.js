import "dotenv/config"
import express, { json } from "express"
import cors from "cors"
import { connectDB } from "./src/config/db.js"
import catererRoutes from "./src/routes/caterers.js"

const PORT = process.env.PORT || 5000
const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ].filter(Boolean),
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  })
)
app.use(json())

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "CaterersNearMe API" })
})

app.use("/api/caterers", catererRoutes)

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found." })
})

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err)
  res.status(500).json({
    success: false,
    message: "Internal server error.",
  })
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})
