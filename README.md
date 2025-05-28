# WeatherApp - Professional Weather Platform

A modern, responsive weather application that provides real-time weather information and forecasts using the OpenWeatherMap API. Built with vanilla JavaScript, HTML5, and CSS3.

## ✨ Features

### Core Weather Features
- **Current Weather**: Real-time weather data for any city worldwide
- **5-Day Forecast**: Extended weather predictions with daily breakdown
- **Location-Based Weather**: Automatic weather detection using GPS coordinates
- **Detailed Weather Metrics**: Temperature, humidity, wind speed, visibility, pressure, and UV index

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Glass-morphism design with smooth animations and transitions
- **Favorite Cities**: Save and quickly access your frequently checked locations
- **Error Handling**: Graceful error messages and fallback demo data
- **Loading States**: Visual feedback during API calls

### Technical Features
- **API Integration**: OpenWeatherMap API for accurate weather data
- **Local Storage**: Persistent favorite cities across browser sessions
- **Geolocation Support**: Auto-detect user's current location
- **Demo Mode**: Fallback demonstration data when API is unavailable

## 🚀 Quick Start

### Prerequisites
- Modern web browser with JavaScript enabled
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Omjee73/WeatherApp.git
   cd WeatherApp
   ```

2. **Get your API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key

3. **Configure the API key**
   - Open `api.js`
   - Replace the placeholder API key with your actual key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

4. **Launch the application**
   - Open `index.html` in your web browser
   - Or use a local server (recommended):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## 📋 Usage

### Search for Weather
1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View current weather and 5-day forecast

### Use Current Location
1. Click "Use My Location" button
2. Allow location permissions when prompted
3. View weather for your current location

### Manage Favorites
1. Search for a city
2. Click "Add Current City" to save to favorites
3. Click on any favorite city to view its weather
4. Use the "×" button to remove favorites

## 🏗️ Project Structure

```
WeatherApp/
│
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Main application logic
├── api.js              # Weather API integration
└── README.md           # Project documentation
```

### File Descriptions

- **`index.html`**: Contains the complete HTML structure including header, search section, weather display, forecast, and favorites
- **`style.css`**: Modern CSS with glass-morphism effects, responsive grid layouts, and smooth animations
- **`script.js`**: Handles user interactions, DOM manipulation, favorites management, and error handling
- **`api.js`**: Manages all OpenWeatherMap API calls including current weather, forecasts, and data formatting

## 🔧 Configuration

### API Configuration
The application uses OpenWeatherMap API. Configure in `api.js`:

```javascript
const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
```

### Supported Units
- Temperature: Celsius (°C)
- Wind Speed: km/h
- Visibility: kilometers
- Pressure: hPa (hectopascals)

## 🎨 Customization

### Styling
The application uses CSS custom properties for easy theming. Main colors can be modified in `style.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  --card-background: rgba(255, 255, 255, 0.95);
  --accent-color: #74b9ff;
}
```

### Weather Icons
Weather icons are mapped in `api.js` using Font Awesome classes. You can customize the icon mapping:

```javascript
const weatherIcons = {
    '01d': 'fas fa-sun',        // Clear sky day
    '01n': 'fas fa-moon',       // Clear sky night
    // Add more custom mappings...
};
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Required Browser Features
- ES6+ JavaScript support
- Fetch API
- Geolocation API (optional)
- Local Storage

## 🛠️ Development

### Adding New Features

1. **New API Endpoints**: Add functions to `api.js`
2. **UI Components**: Update `index.html` and `style.css`
3. **Functionality**: Implement logic in `script.js`

### Development Tools
```bash
# Live server for development
npx live-server

# Or using VS Code Live Server extension
```

### Debug Mode
Enable console logging by uncommenting debug lines in `api.js`:
```javascript
console.log("Fetching weather data:", url);
```

## 🔒 Privacy & Security

- No personal data is collected or stored on external servers
- Favorite cities are stored locally in your browser
- Location data is only used when explicitly requested
- API key should be kept secure (consider server-side proxy for production)

## 🐛 Troubleshooting

### Common Issues

**"City not found" error**
- Check spelling of city name
- Try using country code: "London, UK"

**API errors**
- Verify your API key is correct and active
- Check if you've exceeded API rate limits
- Ensure internet connection is stable

**Location not working**
- Enable location permissions in browser
- Check if HTTPS is being used (required for geolocation)

**Demo mode appears**
- Usually indicates API key issues
- Check browser console for specific error messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Omjee Gupta**
- GitHub: [@Omjee73](https://github.com/Omjee73)
- Project Repository: [WeatherApp](https://github.com/Omjee73/WeatherApp)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Changelog

### Version 1.0.0 (Current)
- Initial release
- Current weather display
- 5-day forecast
- Favorites management
- Responsive design
- Demo mode fallback

## 🔮 Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Weather maps integration
- [ ] Multiple unit systems (Fahrenheit, Kelvin)
- [ ] Dark/Light theme toggle
- [ ] Weather widgets for embedding
- [ ] Offline support with service workers
- [ ] Air quality index display
- [ ] Weather-based background themes

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Font Awesome](https://fontawesome.com/) for the beautiful icons
- [CSS Glass-morphism](https://css.glass/) for design inspiration

---

Made with ❤️ by Omjee Gupta
