export const BASIC_URL = 'https://api.openweathermap.org/data/2.5/'

export const currentWeatherUrlHandler = (lat, lon) => `${BASIC_URL}onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`

export const weatherHandler = (location) => `${BASIC_URL}weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`

export const googleUrlHandler = (lat, lon) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=true&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`