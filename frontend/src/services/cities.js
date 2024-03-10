import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'


// units = imperial
const getTemperatureOfCity = async (lat, lon) => {
    const request = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
    return request.data.main.temp
}

const getLeaderboard = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}


export default { getTemperatureOfCity, getLeaderboard }