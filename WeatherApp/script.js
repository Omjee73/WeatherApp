// Global variables
let currentWeatherData = null;

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFavorites();
    setupEventListeners();
    
    // Show demo data if no API key is set
    // if (API_KEY === 'e279c8edaed95724665d19a55881da75') {
    //     showDemoData();
    // }
    document.addEventListener('DOMContentLoaded', async function () {
    loadFavorites();
    setupEventListeners();

    try {
        await getCurrentWeather("London"); // simple API check
    } catch (e) {
        showDemoData(); // fallback to demo
        showError("Live data not available. Showing demo data.");
    }
});
    // Get user's current location weather
    getCurrentLocation();

});

// Setup event listeners
function setupEventListeners() {
    // Enter key on search input
    document.getElementById('cityInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });
}

// Search weather by city name
async function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();
    
    if (!cityName) {
        showError('Please enter a city name');
        return;
    }
    
    showLoading();
    hideError();
    
    try {
        // Get current weather
        const weatherData = await getCurrentWeather(cityName);
        currentWeatherData = weatherData;
        displayCurrentWeather(weatherData);
        
        // Get forecast
        const forecastData = await getForecast(cityName);
        displayForecast(forecastData);
        
        hideLoading();
    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

// Get user's current location weather
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by this browser');
        return;
    }
    
    showLoading();
    hideError();
    
    navigator.geolocation.getCurrentPosition(
        async function(position) {
            try {
                const { latitude, longitude } = position.coords;
                const weatherData = await getCurrentWeatherByCoords(latitude, longitude);
                currentWeatherData = weatherData;
                displayCurrentWeather(weatherData);
                
                // Update search input with current city
                document.getElementById('cityInput').value = weatherData.name;
                
                // Get forecast
                const forecastData = await getForecast(weatherData.name);
                displayForecast(forecastData);
                
                hideLoading();
            } catch (error) {
                hideLoading();
                showError(error.message);
            }
        },
        function(error) {
            hideLoading();
            showError('Unable to get your location. Please search manually.');
        }
    );
}

// Display current weather data
function displayCurrentWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${formatTemperature(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    
    // Update weather icon
    const iconElement = document.getElementById('weatherIcon');
    const iconClass = getWeatherIcon(data.weather[0].icon);
    iconElement.innerHTML = `<i class="${iconClass}"></i>`;
    
    // Update weather details
    document.getElementById('feelsLike').textContent = `${formatTemperature(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${formatWindSpeed(data.wind.speed)} km/h`;
    document.getElementById('visibility').textContent = `${formatVisibility(data.visibility)} km`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('uvIndex').textContent = 'N/A'; // OpenWeatherMap free tier doesn't include UV index
}

// Display forecast data
function displayForecast(data) {
    const container = document.getElementById('forecastContainer');
    const dailyForecasts = [];
    
    // Group forecasts by day (take one forecast per day)
    const processedDays = new Set();
    
    for (let item of data.list) {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        if (!processedDays.has(dayKey) && dailyForecasts.length < 5) {
            dailyForecasts.push(item);
            processedDays.add(dayKey);
        }
    }
    
    // Generate forecast HTML
    const forecastHTML = dailyForecasts.map(item => {
        const dayName = getDayName(item.dt);
        const temp = formatTemperature(item.main.temp);
        const iconClass = getWeatherIcon(item.weather[0].icon);
        const description = item.weather[0].description;
        
        return `
            <div class="forecast-item">
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-icon">
                    <i class="${iconClass}"></i>
                </div>
                <div class="forecast-temp">${temp}°C</div>
                <div class="forecast-desc">${description}</div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = forecastHTML;
}

// Favorites functionality
function loadFavorites() {
    const favorites = getFavoritesFromStorage();
    displayFavorites(favorites);
}

function getFavoritesFromStorage() {
    const favorites = localStorage.getItem('weatherFavorites');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavoritesToStorage(favorites) {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
}

function displayFavorites(favorites) {
    const container = document.getElementById('favoritesContainer');
    
    if (favorites.length === 0) {
        container.innerHTML = '<p class="no-favorites">No favorite cities added yet</p>';
        return;
    }
    
    const favoritesHTML = favorites.map(city => `
        <div class="favorite-item" onclick="searchFavoriteCity('${city}')">
            <button class="remove-favorite" onclick="removeFavorite('${city}', event)">×</button>
            <div class="favorite-name">${city}</div>
        </div>
    `).join('');
    
    container.innerHTML = favoritesHTML;
}

function addToFavorites() {
    if (!currentWeatherData) {
        showError('No city selected. Please search for a city first.');
        return;
    }
    
    const cityName = currentWeatherData.name;
    const favorites = getFavoritesFromStorage();
    
    if (favorites.includes(cityName)) {
        showError(`${cityName} is already in your favorites`);
        return;
    }
    
    favorites.push(cityName);
    saveFavoritesToStorage(favorites);
    displayFavorites(favorites);
    showSuccess(`${cityName} added to favorites!`);
}

function removeFavorite(cityName, event) {
    event.stopPropagation(); // Prevent triggering the parent click event
    
    const favorites = getFavoritesFromStorage();
    const updatedFavorites = favorites.filter(city => city !== cityName);
    
    saveFavoritesToStorage(updatedFavorites);
    displayFavorites(updatedFavorites);
    showSuccess(`${cityName} removed from favorites`);
}

function searchFavoriteCity(cityName) {
    document.getElementById('cityInput').value = cityName;
    searchWeather();
}

// Utility functions
function showLoading() {
    document.getElementById('loading').classList.add('show');
}

function hideLoading() {
    document.getElementById('loading').classList.remove('show');
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(hideError, 5000);
}

function hideError() {
    document.getElementById('errorMessage').classList.remove('show');
}

function showSuccess(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.background = '#00b894';
    errorElement.classList.add('show');
    
    setTimeout(() => {
        hideError();
        errorElement.style.background = '#ff6b6b';
    }, 3000);
}

// Demo data function (for testing without API key)
function showDemoData() {
    setTimeout(() => {
        const demoWeather = getDemoWeatherData();
        const demoForecast = getDemoForecastData();
        
        currentWeatherData = demoWeather;
        displayCurrentWeather(demoWeather);
        displayForecast(demoForecast);
        
        document.getElementById('cityInput').value = 'Demo City';
        showError('Demo mode: Get your free API key from OpenWeatherMap to use live data');
    }, 1000);
}