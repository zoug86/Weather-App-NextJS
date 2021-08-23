import { useState } from 'react'
import { getDayName } from '../config/index'

import {
    FaCloudMeatball, FaCloudMoonRain, FaCloudMoon, FaSun, FaSnowflake,
    FaCloudRain, FaCloudShowersHeavy, FaCloudSunRain, FaCloudSun, FaCloud
} from 'react-icons/fa'

export default function DailyIcons({ daysInfo, currentTime }) {

    return (
        <>
            {daysInfo.map((day, index) => (
                <div key={index} className=' text-center border-b m-0 flex flex-col align-center justify-center w-40 border-r border-l border-yellow-300 bg-black bg-opacity-40 m-5 shadow-2xl'>
                    <hr className='' />
                    <p className='mb-2 mt-2 text-xl'>{getDayName(currentTime, index)}</p>
                    <hr className='mb-8 w-auto text-center' />
                    <span className='text-6xl text-center text-yellow-100 pl-12'>
                        {day.weather[0].description === 'clear sky' ? <FaSun /> : (day.weather[0].description === 'few clouds') ?
                            <FaCloudSun /> : (day.weather[0].description === 'overcast clouds') ? <FaCloud /> :
                                (day.weather[0].description === 'broken clouds') ? <FaCloudMeatball /> : (day.weather[0].description === 'scattered clouds') ?
                                    <FaCloud /> : (day.weather[0].description === 'moderate rain') ? <FaCloudShowersHeavy /> :
                                        (day.weather[0].description === 'light rain') ? <FaCloudRain /> : <FaCloudSun />}
                    </span>

                    <p className='mt-5 mb-3'><span className='pr-5 text-md text-blue-200'>{Math.floor(day.temp.min)}°</span> <span className='text-md text-red-300'>{Math.floor(day.temp.max)}°</span></p>

                </div>
            ))}

        </>
    )
}
