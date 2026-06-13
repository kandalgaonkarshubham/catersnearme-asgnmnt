export interface CatererLocation {
  city: string
  area: string
}

export interface Caterer {
  _id: string
  name: string
  location: CatererLocation
  pricePerPlate: number
  cuisines: string[]
  rating: number
  reviewCount: number
  isVeg: boolean
  experience?: number
  minGuests?: number
  maxGuests?: number
  tagline?: string
  createdAt: string
  updatedAt: string
}

export interface CaterersApiResponse {
  success: boolean
  data: Caterer[]
}

export interface CatererApiResponse {
  success: boolean
  data: Caterer
}
