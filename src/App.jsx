import SearchBar from './components/SearchBar'

function App() {
  const handleSearch = (city) => {
    console.log('Searching for:', city)
    // later we will call the API here
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  )
}

export default App