// Weather API Configuration
const API_KEY = 'e279c8edaed95724665d19a55881da75'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather icon mapping
const weatherIcons = {
    '01d': 'fas fa-sun',
    '01n': 'fas fa-moon',
    '02d': 'fas fa-cloud-sun',
    '02n': 'fas fa-cloud-moon',
    '03d': 'fas fa-cloud',
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud',
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-rain',
    '09n': 'fas fa-cloud-rain',
    '10d': 'fas fa-cloud-sun-rain',
    '10n': 'fas fa-cloud-moon-rain',
    '11d': 'fas fa-bolt',
    '11n': 'fas fa-bolt',
    '13d': 'fas fa-snowflake',
    '13n': 'fas fa-snowflake',
    '50d': 'fas fa-smog',
    '50n': 'fas fa-smog'
};

// Get current weather by city name
async function getCurrentWeather(cityName) {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Unable to fetch weather data. Please check the city name.');
    }
}

// Get current weather by coordinates
async function getCurrentWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Location not found');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Unable to fetch weather data for your location.');
    }
}

// Get 5-day forecast
async function getForecast(cityName) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Forecast not available');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Unable to fetch forecast data.');
    }
}

// Get weather icon class
function getWeatherIcon(iconCode) {
    return weatherIcons[iconCode] || 'fas fa-cloud';
}

// Format temperature
function formatTemperature(temp) {
    return Math.round(temp);
}

// Format wind speed (convert m/s to km/h)
function formatWindSpeed(speed) {
    return Math.round(speed * 3.6);
}

// Format visibility (convert meters to kilometers)
function formatVisibility(visibility) {
    return Math.round(visibility / 1000);
}

// Get day name from timestamp
function getDayName(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}

// Demo data for testing (remove in production)
function getDemoWeatherData() {
    return {
        name: "Demo City",
        sys: { country: "XX" },
        main: {
            temp: 25,
            feels_like: 27,
            humidity: 65,
            pressure: 1013
        },
        weather: [{
            main: "Clear",
            description: "clear sky",
            icon: "01d"
        }],
        wind: { speed: 5.5 },
        visibility: 10000
    };
}

// Demo forecast data
function getDemoForecastData() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const temps = [25, 28, 22, 26, 24];
    const icons = ['01d', '02d', '10d', '01d', '03d'];
    const descriptions = ['clear sky', 'few clouds', 'light rain', 'clear sky', 'scattered clouds'];
    
    return {
        list: days.map((day, index) => ({
            dt: Date.now() / 1000 + (index * 24 * 3600),
            main: { temp: temps[index] },
            weather: [{
                main: descriptions[index].split(' ')[0],
                description: descriptions[index],
                icon: icons[index]
            }]
        }))
    };
}

// Enhanced: Add debug logging to API calls and add getUVIndex and getAirQuality functions

// Get UV Index by coordinates
async function getUVIndex(lat, lon) {
    try {
        const url = `${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        console.log("Fetching UV Index:", url); // 🐞 Debug
        const response = await fetch(url);
        if (!response.ok) throw new Error('UV Index not available');
        return await response.json();
    } catch (error) {
        throw new Error('Unable to fetch UV Index data.');
    }
}

// Get Air Quality by coordinates (OpenWeatherMap Air Pollution API)
async function getAirQuality(lat, lon) {
    try {
        const url = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        console.log("Fetching Air Quality:", url); // 🐞 Debug
        const response = await fetch(url);
        if (!response.ok) throw new Error('Air Quality data not available');
        return await response.json();
    } catch (error) {
        throw new Error('Unable to fetch air quality data.');
    }
}