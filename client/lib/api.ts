import type { Caterer, CaterersApiResponse, CatererApiResponse } from "@/types/caterer"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// ISR — revalidates every 60s
export async function fetchCaterers(): Promise<Caterer[]> {
  try {
    const res = await fetch(`${API_URL}/api/caterers`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      console.error(`fetchCaterers: ${res.status} ${res.statusText}`)
      return []
    }

    const json: CaterersApiResponse = await res.json()
    return json.data ?? []
  } catch (err) {
    console.error("fetchCaterers: network error", err)
    return []
  }
}

// SSG — cached at build time
export async function fetchCatererById(id: string): Promise<Caterer | null> {
  try {
    const res = await fetch(`${API_URL}/api/caterers/${id}`, {
      cache: "force-cache",
    })

    if (!res.ok) return null

    const json: CatererApiResponse = await res.json()
    return json.data ?? null
  } catch (err) {
    console.error(`fetchCatererById(${id}): network error`, err)
    return null
  }
}
