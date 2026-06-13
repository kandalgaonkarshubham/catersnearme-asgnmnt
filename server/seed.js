import "dotenv/config"
import mongoose from "mongoose"
import { faker } from "@faker-js/faker"
import Caterer from "./src/models/Caterer.js"

const MONGO_URI = process.env.MONGO_URI

const cities = [
  { city: "Mumbai", areas: ["Andheri", "Bandra", "Dadar", "Borivali", "Thane", "Kurla", "Powai", "Juhu"] },
  { city: "Delhi", areas: ["Connaught Place", "Lajpat Nagar", "Rohini", "Dwarka", "Saket", "Karol Bagh", "Vasant Kunj"] },
  { city: "Bengaluru", areas: ["Koramangala", "Indiranagar", "Whitefield", "Jayanagar", "HSR Layout", "Yelahanka", "Malleshwaram"] },
  { city: "Hyderabad", areas: ["Banjara Hills", "Jubilee Hills", "Madhapur", "Secunderabad", "Gachibowli", "Kukatpally"] },
  { city: "Pune", areas: ["Koregaon Park", "Kothrud", "Wakad", "Baner", "Hadapsar", "Aundh", "Viman Nagar"] },
  { city: "Chennai", areas: ["Anna Nagar", "T. Nagar", "Adyar", "Velachery", "Porur", "Chromepet", "Nungambakkam"] },
  { city: "Ahmedabad", areas: ["Navrangpura", "Vastrapur", "Satellite", "Bopal", "Maninagar", "Thaltej"] },
  { city: "Kolkata", areas: ["Park Street", "Salt Lake", "New Town", "Howrah", "Ballygunge", "Behala"] },
  { city: "Jaipur", areas: ["Malviya Nagar", "Vaishali Nagar", "Civil Lines", "Mansarovar", "C-Scheme"] },
  { city: "Surat", areas: ["Adajan", "Vesu", "Pal", "Athwa", "Katargam", "Althan"] },
]

const allCuisines = [
  "North Indian",
  "South Indian",
  "Punjabi",
  "Mughlai",
  "Bengali",
  "Gujarati",
  "Rajasthani",
  "Maharashtrian",
  "Goan",
  "Kerala",
  "Hyderabadi",
  "Awadhi",
  "Continental",
  "Chinese",
  "Italian",
  "Mediterranean",
  "Mexican",
  "Thai",
  "Japanese",
  "Street Food",
  "Jain",
  "Satvik",
  "Coastal",
  "Sindhi",
  "Bihari",
]

const cateringSuffixes = [
  "Caterers",
  "Catering Services",
  "Hospitality",
  "Events & Catering",
  "Food Services",
  "Kitchen",
  "Banquets",
]

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickMultiple(arr, min, max) {
  const count = faker.number.int({ min, max })

  const shuffled = [...arr].sort(() => Math.random() - 0.5)

  return shuffled.slice(0, count)
}

function generateName() {
  const patterns = [
    `${faker.person.lastName()} Caterers`,
    `${faker.person.lastName()} Catering Services`,
    `${faker.person.lastName()} Hospitality`,
    `${faker.person.lastName()} Events & Catering`,
    `${faker.company.name()} Caterers`,
    `${faker.company.name()} Hospitality`,
  ]

  return pick(patterns)
}

function generateTagline() {
  const taglines = [
    "Crafting Memorable Dining Experiences",
    "Premium Catering For Every Occasion",
    "Serving Happiness One Plate At A Time",
    "Where Every Celebration Begins With Great Food",
    "Traditional Flavours, Modern Presentation",
    "Making Events Deliciously Memorable",
    "Excellence In Every Dish",
    "Taste That Brings People Together",
  ]

  return Math.random() < 0.7
    ? pick(taglines)
    : faker.company.catchPhrase()
}

function generateRating(reviewCount) {
  const minRating = reviewCount > 300 ? 4.0 : 3.5

  return faker.number.float({
    min: minRating,
    max: 4.9,
    fractionDigits: 1,
  })
}

function generatePrice(city) {
  const metroCities = ["Mumbai", "Delhi", "Bengaluru"]

  const base = metroCities.includes(city)
    ? faker.number.int({ min: 500, max: 2200 })
    : faker.number.int({ min: 300, max: 1800 })

  return Math.round(base / 50) * 50
}

function generateCaterer(index) {
  const locationData = cities[index % cities.length]
  const area = pick(locationData.areas)

  const isVeg = Math.random() < 0.3

  const cuisinePool = isVeg
    ? allCuisines.filter(
        cuisine =>
          !["Mughlai", "Hyderabadi", "Goan", "Coastal"].includes(cuisine)
      )
    : allCuisines

  const reviewCount = faker.number.int({
    min: 12,
    max: 840,
  })

  const minGuests = pick([20, 30, 50, 100, 150, 200])

  const maxGuests =
    minGuests +
    faker.number.int({
      min: 100,
      max: 1200,
    })

  return {
    name: generateName(),

    location: {
      city: locationData.city,
      area,
    },

    pricePerPlate: generatePrice(locationData.city),

    cuisines: pickMultiple(cuisinePool, 2, 5),

    rating: generateRating(reviewCount),

    reviewCount,

    isVeg,

    experience: faker.number.int({
      min: 1,
      max: 35,
    }),

    minGuests,

    maxGuests,

    tagline: generateTagline(),
  }
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)

    console.log("✅ Connected to MongoDB")

    await Caterer.deleteMany({})

    console.log("🗑️ Cleared existing caterers")

    const caterers = Array.from(
      { length: 100 },
      (_, index) => generateCaterer(index)
    )

    await Caterer.insertMany(caterers)

    console.log("🌱 Seeded 100 caterers successfully")

    const byCity = caterers.reduce((acc, caterer) => {
      acc[caterer.location.city] =
        (acc[caterer.location.city] || 0) + 1

      return acc
    }, {})

    console.log("\n📊 Distribution by city:")

    Object.entries(byCity)
      .sort((a, b) => b[1] - a[1])
      .forEach(([city, count]) => {
        console.log(`   ${city}: ${count}`)
      })

    const avgPrice = Math.round(
      caterers.reduce(
        (sum, caterer) => sum + caterer.pricePerPlate,
        0
      ) / caterers.length
    )

    const avgRating = (
      caterers.reduce(
        (sum, caterer) => sum + caterer.rating,
        0
      ) / caterers.length
    ).toFixed(2)

    console.log(`\n💰 Avg price per plate: ₹${avgPrice}`)
    console.log(`⭐ Avg rating: ${avgRating}`)
    console.log(`🥗 Veg caterers: ${caterers.filter(c => c.isVeg).length}`)

    await mongoose.disconnect()

    console.log("\n✅ Done!")
  } catch (error) {
    console.error("❌ Seed failed:", error)

    process.exit(1)
  }
}

seed()
