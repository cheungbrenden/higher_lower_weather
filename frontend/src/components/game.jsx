import { useEffect, useState } from 'react'
import cityService from '../services/cities'



const Game = () => {

    // TODO: add major american cities
    const [cities, setCities] = useState(null)
    const [visitedCitiesIndex, setVisitedCitiesIndex] = useState([])

    const [givenCity, setGivenCity] = useState(null)
    const [comparisonCity, setComparisonCity] = useState(null)

    const [temperatureUnits, setTemperatureUnits] = useState('imperial')

    const [points, setPoints] = useState(0)

    const [currentlyPlaying, setCurrentlyPlaying] = useState(true)



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
        setCurrentlyPlaying(false)

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
            {!currentlyPlaying ?
                <div>you lost with a score of {points}</div> :
                <div>
                    <div className="flex mb-4">
                        <div className="mx-8 w-1/2 border-solid border-2 flex items-center justify-center">
                            {givenCity.name}, {givenCity.fullCountryName} has a temperature of {temperatureUnits === 'imperial' ? givenCity.temperature : ((givenCity.temperature - 32) * 5 / 9).toFixed(2)}° {temperatureUnits === 'imperial' ? 'Fahrenheit' : 'Celsius'}
                            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${givenCity.latitude},${givenCity.longitude}&format=png&&zoom=8&size=400x400&key=${api_key}`} />
                        </div>
                        <div className="mx-8 w-1/2 border-solid border-2 flex items-center justify-center">
                            {comparisonCity.name}, {comparisonCity.fullCountryName} has a temperature of {temperatureUnits === 'imperial' ? comparisonCity.temperature : ((comparisonCity.temperature - 32) * 5 / 9).toFixed(2)}° {temperatureUnits === 'imperial' ? 'Fahrenheit' : 'Celsius'}
                            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${comparisonCity.latitude},${comparisonCity.longitude}&format=png&&zoom=8&size=400x400&key=${api_key}`} />

                        </div>

                    </div>
                    <div>
                        <button className="mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={givenCity.temperature > comparisonCity.temperature ? handleWrongAnswer : handleCorrectAnswer}>Higher</button>
                        <button className="mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={givenCity.temperature > comparisonCity.temperature ? handleCorrectAnswer : handleWrongAnswer}>Lower</button>
                    </div>
                    <div>
                        Points: {points}
                    </div>
                    <button className="mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restartGame}>Restart</button>
                    <button className="mx-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleTemperatureUnitsChange}>Change Temperature Units</button>

                </div>
            }
        </div>

    )
}

export default Game

