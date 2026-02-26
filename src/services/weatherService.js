export async function getWeather(city, unit = 'metric') {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  const BASE_URL = 'https://api.openweathermap.org/data/2.5'

  if (!API_KEY) {
    throw new Error('API key is missing. Check .env file.')
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error('City not found or API error')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch weather')
  }
}