import { useState, useEffect } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function WeatherDisplay() {
    const currentTime = new Date().toString().slice(0, 15)
    const [searchTerm, setSearchTerm] = useState('')
    const [lat, setLat] = useState()
    const [lon, setLon] = useState()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)

        })
    }, [])
    console.log(lat, lon)
    return (
        <>
            <h1 className='text-center text-6xl border-b-4 p-5'>Weather Forecast</h1>
            <div className='flex flex-col justify-center items-center mt-20'>
                <div className=' flex items-center justify-center text-gray-600 bg-red-100'>
                    <div className='relative text-gray-600 bg-red-100'>
                        <form>
                            <input
                                type='search'
                                name='search'
                                id='search'
                                placeholder='Search City: London, UK'
                                value={searchTerm}
                                className='bg-white h-12 px-5 pr-10 text-md focus:outline-none w-72 border-b-4'
                                onChange={(e) => setSearchTerm(e.target.value)} />
                            <FaMapMarkerAlt className='absolute top-0 right-0 text-black mt-3 mr-4' />
                        </form>
                    </div>
                    <span className='flex justify-end w-72 text-black-800'>{currentTime}</span>
                </div>
            </div >
        </>
    )
}
