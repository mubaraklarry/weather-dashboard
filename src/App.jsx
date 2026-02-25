import { useState } from 'react'
import SearchBar from './components/SearchBar'
import LoadingSpinner from './components/LoadingSpinner'
import RecentSearches from './components/RecentSearches'
import { getWeather } from './services/weatherService'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recentCities, setRecentCities] = useState([])
  const [unit, setUnit] = useState('metric') // metric = °C, imperial = °F

  const handleSearch = async (city) => {
    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      const data = await getWeather(city, unit)
      setWeather(data)

      if (!recentCities.includes(city)) {
        setRecentCities(prev => [city, ...prev].slice(0, 5))
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800">
          Weather Dashboard
        </h1>

        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-full bg-gray-200 p-1">
            <button
              onClick={() => setUnit('metric')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                unit === 'metric'
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                unit === 'imperial'
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              °F
            </button>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />

        <RecentSearches recentCities={recentCities} onSelect={handleSearch} />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="mt-8 max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {weather && (
          <div className="mt-10 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 max-w-2xl mx-auto border border-white/30">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {weather.name}, {weather.sys.country}
              </h2>

              <div className="relative mb-6">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt={weather.weather[0].description}
                  className="w-48 h-48 md:w-64 md:h-64 mx-auto drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 rounded-full blur-xl"></div>
              </div>

              <p className="text-7xl md:text-8xl font-extrabold text-gray-900 tracking-tight mb-2">
                {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
              </p>

              <p className="text-2xl md:text-3xl font-medium text-gray-700 capitalize mb-10">
                {weather.weather[0].description}
              </p>

              <div className="w-full grid grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/40">
                  <p className="text-sm md:text-base font-medium text-gray-600 mb-2">Humidity</p>
                  <p className="text-3xl md:text-4xl font-bold text-gray-900">{weather.main.humidity}%</p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/40">
                  <p className="text-sm md:text-base font-medium text-gray-600 mb-2">Wind</p>
                  <p className="text-3xl md:text-4xl font-bold text-gray-900">{weather.wind.speed} m/s</p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-white/40">
                  <p className="text-sm md:text-base font-medium text-gray-600 mb-2">Feels like</p>
                  <p className="text-3xl md:text-4xl font-bold text-gray-900">
                    {Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App