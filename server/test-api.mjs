/**
 * POST API Test Script
 * Run with: node test-api.mjs
 */
import "dotenv/config"

const API_URL = "http://localhost:5000/api/caterers"
const API_KEY = process.env.API_KEY

async function runTests() {
  console.log("🚀 Starting API Tests...\n")

  // 1. Unauthorized
  console.log("Test 1: POST without API Key (Expected: 401)")
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test" }),
    })
    const data = await res.json()
    console.log(`Status: ${res.status} | Success: ${data.success} | Message: ${data.message}\n`)
  } catch (err) {
    console.error("Error in Test 1:", err.message)
  }

  // 2. Validation Failure
  console.log("Test 2: POST with API Key but Invalid Body (Expected: 400)")
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify({ name: "S" }), // Too short
    })
    const data = await res.json()
    console.log(`Status: ${res.status} | Success: ${data.success} | Message: ${data.message}`)
    console.log(`Validation Errors:`, JSON.stringify(data.errors, null, 2), "\n")
  } catch (err) {
    console.error("Error in Test 2:", err.message)
  }

  // 3. Success
  console.log("Test 3: POST with Valid Data (Expected: 201)")
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify({
        name: "Test Caterer " + Date.now(),
        location: { city: "Mumbai", area: "Andheri" },
        pricePerPlate: 500,
        cuisines: ["Indian"],
      }),
    })
    const data = await res.json()
    console.log(`Status: ${res.status} | Success: ${data.success} | Message: ${data.message}\n`)
  } catch (err) {
    console.error("Error in Test 3:", err.message)
    console.log("Note: Make sure the server is running on http://localhost:5000")
  }
}

runTests()
