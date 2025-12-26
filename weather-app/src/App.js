import { useState } from "react";
import "./App.css";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "845e2a93ab8d91491a0425e89f082c71";

  // Fetch weather data from API
  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  // Icon based on weather
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <WiDaySunny size={100} />;
      case "Clouds":
        return <WiCloudy size={100} />;
      case "Rain":
      case "Drizzle":
        return <WiRain size={100} />;
      case "Snow":
        return <WiSnow size={100} />;
      case "Mist":
      case "Fog":
      case "Haze":
        return <WiFog size={100} />;
      case "Thunderstorm":
        return <WiThunderstorm size={100} />;
      default:
        return <WiDaySunny size={100} />;
    }
  };

  // Temperature-based background and text color
  const getTempStyles = (temp) => {
    if (temp <= 0) return { bg: "#4DA6FF", color: "#fff" };
    if (temp <= 5) return { bg: "#80C1FF", color: "#000" };
    if (temp <= 10) return { bg: "#A3D2FF", color: "#000" };
    if (temp <= 15) return { bg: "#C2E0FF", color: "#000" };
    if (temp <= 20) return { bg: "#DFFFD6", color: "#000" };
    if (temp <= 25) return { bg: "#FFE28C", color: "#000" };
    if (temp <= 30) return { bg: "#FFA64D", color: "#000" };
    return { bg: "#FF4D4D", color: "#fff" };
  };

  const styles = weather ? getTempStyles(weather.main.temp) : { bg: "#e1e8ed", color: "#000" };

  return (
    <div
      className="app-container"
      style={{ background: styles.bg, color: styles.color, transition: "background 0.7s ease" }}
    >
      <div className="app">
        <h1 className="app-title">🌤️ Weather Forecast</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>

        {loading && <div className="loader"></div>}

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card" style={{ background: styles.bg, color: styles.color }}>
            <div className="main-weather">
              <div className="weather-icon">{getWeatherIcon(weather.weather[0].main)}</div>
              <div className="main-info">
                <h2>{weather.name}</h2>
                <p className="temp">{Math.round(weather.main.temp)}°C</p>
                <p className="desc">{weather.weather[0].description}</p>
                <p>Humidity: {weather.main.humidity}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
