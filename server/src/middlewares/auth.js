export const authenticateApiKey = (req, res, next) => {
  const apiKey = req.header("X-API-KEY")
  const validApiKey = process.env.API_KEY

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or missing API Key",
    })
  }

  next()
}
