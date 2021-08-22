import { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa'
import { currentWeatherUrlHandler, weatherHandler, googleUrlHandler } from '../config/index'
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
            const { data: googleData } = await axios.get(googleUrlHandler(lat, lon))
            setLocation(googleData.plus_code.compound_code.substr(googleData.plus_code.compound_code.indexOf(' ') + 1))
            setTemperature(weatherData.current.temp)
            setDescription(weatherData.current.weather[0].description)
            setFeelsLike(weatherData.current.feels_like)
            setHumidity(weatherData.current.humidity)
            setPressure(weatherData.current.pressure)
            setWindSpeed(weatherData.current.wind_speed)
        }
        if (lat && lon) {
            getCurrentPositionHandler(lat, lon)
        }
    }, [firstLoading])

    useEffect(async () => {
        if (loading) {
            const { data: weatherData } = await axios.get(currentWeatherUrlHandler(lat, lon))
            console.log(weatherData)
            const { data: newGoogleData } = await axios.get(googleUrlHandler(lat, lon))
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
            <div className='flex align-center justify-start ml-10 mt-5'>
                <FaLocationArrow className='text-3xl text-yellow-100 mb-5 cursor-pointer' onClick={() => setFirstLoading(true)} />
                <span className='ml-4'>Current Location</span>
            </div>

            <div className='flex flex-col justify-center items-center'>

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
                    <span className='flex justify-end w-72 text-blue-900 text-xl pr-4'>{currentTime}</span>
                </div>
                <div className='flex items-center justify-center mt-10'>
                    <div className='flex flex-col items-center justify-center'>
                        <WeatherIcon iconDescription={iconDescription} />
                        <span className='text-xl'>{description}</span>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <span className='text-6xl'>{temperature && Math.ceil(temperature)}°</span>
                        <span className='text-xl'> feels like {temperature && Math.ceil(feelsLike)}°</span>
                    </div>
                </div>
                <div className='flex justify-around mt-10'>
                    <span className='text-xl mr-10'>Humidity: {humidity}%</span>
                    <span className='text-xl mr-10'>Pressure: {pressure} mb</span>
                    <span className='text-xl mr-10'>Wind Speed: {windSpeed} km/h</span>
                </div>
            </div >
        </>
    )
}
