import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

const apiKey = '53a5697186e2f54af2da378253fc8207';

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try  {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    );

      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError('City not found');
      }
    } catch (err) {
      setError('Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">🌦️ Weather App</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getWeather()}
            className="city-input"
          />
          <button onClick={getWeather} className="get-weather-btn">Search</button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'salmon' }}>{error}</p>}

        {weather && (
          <div className="weather-box">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <p className="description">{weather.weather[0].description}</p>
            <p>🌡️ {weather.main.temp}°F</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind: {weather.wind.speed} m/s</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
