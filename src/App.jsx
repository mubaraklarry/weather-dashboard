import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import LoadingSpinner from './components/LoadingSpinner'
import RecentSearches from './components/RecentSearches'
import { getWeather } from './services/weatherService'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recentCities, setRecentCities] = useState(() => {
    const saved = localStorage.getItem('recentCities')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('recentCities', JSON.stringify(recentCities))
  }, [recentCities])

  const handleSearch = async (city) => {
    setLoading(true)
    setError(null)
    setWeather(null)

    try {
      const data = await getWeather(city)
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
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 text-gray-800">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} />

        <RecentSearches recentCities={recentCities} onSelect={handleSearch} />

        {loading && <LoadingSpinner />}

        {error && (
  <div className="mt-8 max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">
    <div className="flex flex-col items-center">
      <svg 
        className="w-12 h-12 text-red-500 mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>

      <h3 className="text-xl font-semibold text-red-700 mb-2">
        City not found
      </h3>

      <p className="text-gray-600">
        {error.includes('not found') 
          ? "We couldn't find that city. Check the spelling or try another name."
          : error}
      </p>

      <p className="text-sm text-gray-500 mt-4">
        Examples: Accra, Lagos, London, New York
      </p>
    </div>
  </div>
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