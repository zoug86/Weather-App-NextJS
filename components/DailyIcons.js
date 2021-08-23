import { useState } from 'react'
import { getDayName } from '../config/index'

import {
    FaCloudMeatball, FaCloudMoonRain, FaCloudMoon, FaSun, FaSnowflake,
    FaCloudRain, FaCloudShowersHeavy, FaCloudSunRain, FaCloudSun, FaCloud
} from 'react-icons/fa'

export default function DailyIcons({ dailyInfo, currentTime }) {
    const description = dailyInfo.weather[0].description
    const minTemp = Math.floor(dailyInfo.temp.min)
    const maxTemp = Math.floor(dailyInfo.temp.max)

    return (
        <>
            <p className='mb-3 mt-2 text-xl'>{getDayName(currentTime)}</p>
            <hr className='mb-8' />
            <span className='text-6xl text-yellow-100'>
                {description === 'clear sky' ? <FaSun /> : (description === 'few clouds') ?
                    <FaCloudSun /> : (description === 'overcast clouds') ? <FaCloud /> :
                        (description === 'broken clouds') ? <FaCloudMeatball /> : (description === 'scattered clouds') ?
                            <FaCloud /> : (description === 'moderate rain') ? <FaCloudShowersHeavy /> :
                                (description === 'light rain') ? <FaCloudRain /> : <FaCloudSun />}
            </span>

            <p className='mt-5 mb-5'><span className='pr-2 text-md text-blue-200'>{minTemp}°</span> <span className='text-md text-red-300'>{maxTemp}°</span></p>
        </>
    )
}
