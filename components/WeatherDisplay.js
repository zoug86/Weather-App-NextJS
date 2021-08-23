import { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa'
import { currentWeatherUrlHandler, weatherHandler, googleUrlHandler, getDayName } from '../config/index'
import WeatherIcon from './WeatherIcon'
import DailyIcons from './DailyIcons'
import axios from 'axios'

export default function WeatherDisplay() {
    const currentTime = new Date().toString().slice(0, 15)
    const [searchCity, setSearchCity] = useState('')
    const [firstLoading, setFirstLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState('------------⛅')
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()
    //Current Weather Info
    const [temperature, setTemperature] = useState()
    const [description, setDescription] = useState('')
    const [iconDescription, setIconDescription] = useState('')
    const [feelsLike, setFeelsLike] = useState()
    const [humidity, setHumidity] = useState()
    const [pressure, setPressure] = useState()
    const [windSpeed, setWindSpeed] = useState()

    // Weekly Info
    const [daysInfo, setDaysInfo] = useState([])


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
            setIconDescription(weatherData.current.weather[0].main.toLowerCase())
            setFeelsLike(weatherData.current.feels_like)
            setHumidity(weatherData.current.humidity)
            setPressure(weatherData.current.pressure)
            setWindSpeed(weatherData.current.wind_speed)
            setDaysInfo(weatherData.daily)
        }

        if (lat && lon && !firstLoading) {
            getCurrentPositionHandler(lat, lon)
        }

    }, [firstLoading])

    // Get user entered location info
    useEffect(async () => {
        if (loading) {
            const { data: weatherData } = await axios.get(currentWeatherUrlHandler(lat, lon))
            //console.log(weatherData)                
            setLoading(false)
            setTemperature(weatherData.current.temp)
            setDescription(weatherData.current.weather[0].description)
            setIconDescription(weatherData.current.weather[0].main.toLowerCase())
            setFeelsLike(weatherData.current.feels_like)
            setHumidity(weatherData.current.humidity)
            setPressure(weatherData.current.pressure)
            setWindSpeed(weatherData.current.wind_speed)
            setDaysInfo(weatherData.daily)
        }
    }, [loading])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (searchCity) {
            try {
                const { data } = await axios.get(weatherHandler(searchCity))
                //console.log(data)
                setLat(data.coord.lat)
                setLon(data.coord.lon)
                setLocation(`${data.name}, ${data.sys.country}`)
                setLoading(true)
                setSearchCity('')
            } catch (error) {
                alert('Check City name!')
            }

        }

    }

    return (
        <>
            <div className='text-center text-4xl border-b-2 border-t-2 w-100 p-5'>
                <h2>{location}</h2>
            </div>
            <div className='flex align-center justify-start ml-10 mt-5'>
                <FaLocationArrow className='text-3xl text-yellow-100 mb-5 cursor-pointer' onClick={() => setFirstLoading(true)} />
                <span className='ml-4'>Current Location</span>
            </div>

            <div className='flex flex-col justify-center items-center max-w-screen-md'>

                <div className='flex items-center justify-center text-gray-600 bg-yellow-100'>
                    <div className='relative text-gray-600 bg-red-100'>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='search'
                                name='search'
                                id='search'
                                placeholder='Search City: Victoria, BC, CA'
                                value={searchCity}
                                className='bg-white h-12 px-5 pr-10 text-md focus:outline-none w-72'
                                onChange={(e) => setSearchCity(e.target.value)} />
                            <FaMapMarkerAlt className='absolute top-0 right-0 text-black mt-3 mr-4' />
                        </form>
                    </div>
                    <span className='flex justify-end w-72 text-blue-900 text-xl pr-4'>{currentTime}</span>
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <div className='flex flex-col items-center justify-center'>
                        <WeatherIcon iconDescription={iconDescription} />
                        <span className='text-xl uppercase tracking-widest text-white-800 font-black'>{description}</span>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <span className={`text-8xl ${temperature < 30 ? 'text-green-800' : 'text-red-800'}`}>{temperature && Math.ceil(temperature)}°</span>
                        <span className='text-xl text-black'> feels like {temperature && Math.ceil(feelsLike)}°</span>
                    </div>
                </div>
                <div className='flex justify-around mt-10'>
                    <span className='text-xl pr-10 w-50'>Humidity: {humidity}%</span>
                    <span className='text-xl pr-10'>Pressure: {pressure} mb</span>
                    <span className='text-xl'>Wind Speed: {windSpeed} km/h</span>
                </div>
                <div className='flex justify-between mt-5 mb-10'>
                    {daysInfo.map((day, index) => (
                        <div key={index} className='pr-8 pl-8 mt-5 border-r border-l border-yellow-300 bg-black bg-opacity-40 m-5'>

                            <DailyIcons dailyInfo={day} currentTime={currentTime} />

                        </div>
                    ))}
                </div>

            </div >
        </>
    )
}
