import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("");

    const search = async (city) => {
        if (city === "") {
            alert("City name empty! Enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=kakkanad&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert("failed");
                return;
            }

            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                country: data.sys.country,
                city: data.name,
            });
        } catch (error) {
            console.error("Error in fetching weather data", error);
            alert("Failed to fetch weather data. Please try again.");
        }
    }

    const handleSearch = () => {
        search(city);
    }

    return (
        <Container style={{ width: "400px", height: '700px' }} className="d-flex flex-column justify-content-center align-items-center border rounded  mt-5" id='bg'>
            <div className="text-center" id='box'>
                <div className="d-flex gap-2 justify-content-center align-items-center">
                    <input
                        ref={inputRef}
                        className='mb-3'
                        style={{ width: "300px", borderRadius: '15px', height: '50px' }}
                        type="text"
                        placeholder='search city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button className='bg-transparent' onClick={handleSearch} id='searchicon'>
                        <i className="fa-solid fa-magnifying-glass text-black"></i>
                    </button>
                </div>

                {weatherData && (
                    <>
                        <h2 className="text-black">{weatherData.location}</h2>
                        <img
                            width={'280px'}
                            height={'200px'}
                            src="https://th.bing.com/th/id/R.1b5fafebab26ecbededdcc782bd3a3e7?rik=9Umir21jDqIEwA&riu=http%3a%2f%2fclipart-library.com%2fimages%2f8ixrdpn4T.png&ehk=HdTKFP%2bgr3zivYDiZZ7x2GHFagH4mShBl0F1tc2Nrw8%3d&risl=&pid=ImgRaw&r=0" // Updated to use the icon from API
                            alt="Weather Icon"
                        />
                        <h1 className="text-black mt-3">{weatherData.temperature}°C</h1>
                        <h3 className="text-black">city:{weatherData.city}</h3>
                        <h4  className="text-black">Country:{weatherData.country}</h4>
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <h4 className="text-black">Wind: {weatherData.windSpeed} m/s</h4>
                            <h4 className="text-black">Humidity: {weatherData.humidity}%</h4>
                        </div>
                    </>
                )}
            </div>
        </Container>
    );
}

export default Weather;
