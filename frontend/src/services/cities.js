import axios from 'axios'

const getAllCities = async () => {
    const request = await axios.get('http://localhost:3001/cities')
    return request.data
}

// units = imperial
const getTemperatureOfCity = async (lat, lon) => {
    const request = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
    return request.data.main.temp
}

const getCountryName = async (countryCode) => {
    const request = await axios.get('http://localhost:3001/countryCodeToName')
    return request.data[countryCode]
}

const getLeaderboard = async () => {
    const request = await axios.get('http://localhost:3002/api/users')
    return request.data
}


export default { getAllCities, getTemperatureOfCity, getCountryName, getLeaderboard }