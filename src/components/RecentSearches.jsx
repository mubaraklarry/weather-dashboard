function RecentSearches({ recentCities, onSelect }) {
  if (recentCities.length === 0) return null

  return (
    <div className="mt-6">
      <p className="text-sm text-gray-600 mb-2">Recent searches</p>
      <div className="flex flex-wrap gap-2">
        {recentCities.map((city) => (
          <button
            key={city}
            onClick={() => onSelect(city)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300 transition"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RecentSearches