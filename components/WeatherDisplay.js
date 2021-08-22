import { useState, useEffect } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { currentWeatherUrlHandler, weatherHandler } from '../config/index'
import WeatherIcon from './WeatherIcon'
import axios from 'axios'

export default function WeatherDisplay() {
    const currentTime = new Date().toString().slice(0, 15)
    const [searchCity, setSearchCity] = useState('')
    const [firstLoading, setFirstLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState('')
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    //Current Weather Info
    const [temperature, setTemperature] = useState()
    const [description, setDescription] = useState('')
    const [iconDescription, setIconDescription] = useState('cool')
    const [feelsLike, setFeelsLike] = useState()
    const [humidity, setHumidity] = useState()
    const [pressure, setPressure] = useState()
    const [windSpeed, setWindSpeed] = useState()


    useEffect(() => {
        // Get current locaiton
        if (firstLoading) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude)
                setLon(position.coords.longitude)
                setFirstLoading(false)

            })
        }
        const getCurrentPositionHandler = async (lat, lon) => {
            const { data: weatherData } = await axios.get(currentWeatherUrlHandler(lat, lon))
            const { data: googleData } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=true&key=AIzaSyBscti3YD - E_RQ8C3B6cGXdaongp9yeVqA`)
            setLocation(googleData.plus_code.compound_code.substr(googleData.plus_code.compound_code.indexOf(' ') + 1))
            setTemperature(weatherData.current.temp)
            setDescription(weatherData.current.weather[0].description)
            setFeelsLike(weatherData.current.feels_like)
            setHumidity(weatherData.current.humidity)
            setPressure(weatherData.current.pressure)
            setWindSpeed(weatherData.current.win_speed)
        }
        if (lat && lon) {
            getCurrentPositionHandler(lat, lon)
        }
    }, [firstLoading])

    useEffect(async () => {
        if (loading) {
            const { data: weatherData } = await axios.get(currentWeatherUrlHandler(lat, lon))
            console.log(weatherData)
            const { data: newGoogleData } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=false&key=AIzaSyBscti3YD - E_RQ8C3B6cGXdaongp9yeVqA`)
            setLocation(`${searchCity.split(',')[0]}, ${newGoogleData.plus_code.compound_code.substr(newGoogleData.plus_code.compound_code.indexOf(',') + 1)}`)
            console.log(newGoogleData)
            setLoading(false)
        }
    }, [loading])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (searchCity) {
            const { data } = await axios.get(weatherHandler(searchCity))
            setLat(data.coord.lat)
            setLon(data.coord.lon)
            setLoading(true)
            setSearchCity('')
        }

    }
    return (
        <>
            <h1 className='text-center text-6xl border-b-4 p-5'>Weather Forecast</h1>
            <div className='text-center text-4xl border-b-2 w-100 p-5'>
                <h2>{location}</h2>
            </div>
            <div className='flex flex-col justify-center items-center mt-20'>
                <div className='flex items-center justify-center text-gray-600 bg-yellow-100'>
                    <div className='relative text-gray-600 bg-red-100'>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='search'
                                name='search'
                                id='search'
                                placeholder='Search City: Victoria, BC, CA'
                                value={searchCity}
                                className='bg-white h-12 px-5 pr-10 text-md focus:outline-none w-72 border-b-4'
                                onChange={(e) => setSearchCity(e.target.value)} />
                            <FaMapMarkerAlt className='absolute top-0 right-0 text-black mt-3 mr-4' />
                        </form>
                    </div>
                    <span className='flex justify-end w-72 text-black-800 text-xl pr-4'>{currentTime}</span>
                </div>
                <div className='flex items-center justify-center mt-10'>
                    <WeatherIcon iconDescription={iconDescription} />
                    <div className='flex flex-col items-center justify-center'>
                        <span className='text-6xl'>{temperature && Math.ceil(temperature)}°</span>
                        <span className='text-xl'> Feels like {temperature && Math.ceil(temperature)}°</span>
                    </div>
                </div>
            </div >
        </>
    )
}
