import { useState } from 'react'
import SearchBar from './components/SearchBar'
import { getWeather } from './services/weatherService'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (city) => {
    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      const data = await getWeather(city)
      setWeather(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <p className="text-center mt-8 text-gray-600">Loading weather...</p>
        )}

        {error && (
          <p className="text-center mt-8 text-red-600 font-medium">{error}</p>
        )}

        {weather && (
          <div className="mt-10 bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {weather.name}, {weather.sys.country}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="mx-auto"
            />

            <p className="text-5xl font-bold text-gray-800 my-4">
              {Math.round(weather.main.temp)}°C
            </p>

            <p className="text-xl capitalize text-gray-600 mb-6">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-3 gap-4 text-gray-700">
              <div>
                <p className="font-medium">Humidity</p>
                <p className="text-xl">{weather.main.humidity}%</p>
              </div>
              <div>
                <p className="font-medium">Wind</p>
                <p className="text-xl">{weather.wind.speed} m/s</p>
              </div>
              <div>
                <p className="font-medium">Feels like</p>
                <p className="text-xl">{Math.round(weather.main.feels_like)}°C</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App