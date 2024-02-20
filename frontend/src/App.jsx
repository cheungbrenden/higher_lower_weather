import { useEffect, useState } from 'react'
import cityService from './services/cities'

function App() {

  const [cities, setCities] = useState(null)
  const [visitedCitiesIndex, setVisitedCitiesIndex] = useState([])

  const [givenCity, setGivenCity] = useState(null)
  const [comparisonCity, setComparisonCity] = useState(null)

  const [temperatureUnits, setTemperatureUnits] = useState('imperial')

  const [points, setPoints] = useState(0)

  const api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const initializeStartingCities = async (cities) => {

    const givenCityIndex = Math.floor(Math.random() * cities.length)
    let comparisonCityIndex = Math.floor(Math.random() * cities.length)
    while (givenCityIndex === comparisonCityIndex) {
      comparisonCityIndex = Math.floor(Math.random() * cities.length)
    }

    setVisitedCitiesIndex([givenCityIndex, comparisonCityIndex])

    const initialGivenCity = cities[givenCityIndex]
    const initialComparisonCity = cities[comparisonCityIndex]

    const temperatureGivenCity = await cityService.getTemperatureOfCity(initialGivenCity.latitude, initialGivenCity.longitude)
    const fullCountryNameOfGivenCity = await cityService.getCountryName(initialGivenCity.country)

    setGivenCity({ ...initialGivenCity, temperature: temperatureGivenCity, fullCountryName: fullCountryNameOfGivenCity })

    const temperatureComparisonCity = await cityService.getTemperatureOfCity(initialComparisonCity.latitude, initialComparisonCity.longitude)
    const fullCountryNameOfComparisonCity = await cityService.getCountryName(initialComparisonCity.country)

    setComparisonCity({ ...initialComparisonCity, temperature: temperatureComparisonCity, fullCountryName: fullCountryNameOfComparisonCity })



  }

  const handleCorrectAnswer = async () => {
    console.log("correct answer")

    setGivenCity(comparisonCity)

    let comparisonCityIndex = Math.floor(Math.random() * cities.length)
    while (visitedCitiesIndex.includes(comparisonCityIndex)) {
      comparisonCityIndex = Math.floor(Math.random() * cities.length)
    }

    setVisitedCitiesIndex([...visitedCitiesIndex, comparisonCityIndex])
    const newComparisonCity = cities[comparisonCityIndex]

    const temperatureComparisonCity = await cityService.getTemperatureOfCity(newComparisonCity.latitude, newComparisonCity.longitude)
    const fullCountryNameOfComparisonCity = await cityService.getCountryName(newComparisonCity.country)

    setComparisonCity({ ...newComparisonCity, temperature: temperatureComparisonCity, fullCountryName: fullCountryNameOfComparisonCity })

    setPoints(points + 1)
  }

  const handleWrongAnswer = () => {
    console.log("incorrect answer")
    setPoints(0)
  }

  const handleTemperatureUnitsChange = () => {
    setTemperatureUnits(temperatureUnits === 'imperial' ? 'metric' : 'imperial')
  }

  const restartGame = async () => {
    setPoints(0)
    initializeStartingCities(cities)
  }

  useEffect(() => {
    cityService
      .getAllCities()
      .then(data => {
        setCities(data)
        initializeStartingCities(data)
      })
  }, [])

  if (!cities || !givenCity || !comparisonCity) {
    return null
  }

  return (
    <div>
      <h1>Higher Lower for Weather Around the World</h1>
      <div>
        {givenCity.name}, {givenCity.fullCountryName} has a temperature of {temperatureUnits === 'imperial' ? givenCity.temperature : ((givenCity.temperature - 32) * 5 / 9).toFixed(2)}° {temperatureUnits === 'imperial' ? 'Fahrenheit' : 'Celsius'}
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${givenCity.latitude},${givenCity.longitude}&format=png&&zoom=8&size=400x400&key=${api_key}`} />
      </div>
      <div>
        {comparisonCity.name}, {comparisonCity.fullCountryName} has a temperature of {temperatureUnits === 'imperial' ? comparisonCity.temperature : ((comparisonCity.temperature - 32) * 5 / 9).toFixed(2)}° {temperatureUnits === 'imperial' ? 'Fahrenheit' : 'Celsius'}
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${comparisonCity.latitude},${comparisonCity.longitude}&format=png&&zoom=8&size=400x400&key=${api_key}`} />
        <button onClick={givenCity.temperature > comparisonCity.temperature ? handleWrongAnswer : handleCorrectAnswer}>Higher</button>
        <button onClick={givenCity.temperature > comparisonCity.temperature ? handleCorrectAnswer : handleWrongAnswer}>Lower</button>
      </div>
      <div>
        Points: {points}
      </div>
      <button onClick={restartGame}>Restart</button>
      <button onClick={handleTemperatureUnitsChange}>Change Temperature Units</button>
    </div>
  )
}

export default App
