import { useState } from "react";
import video from "./video/vid.mp4";
import WeatherDisplay from "./WeatherDisplay";


function App() {
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const apiKey = "4e13120cf71ced98bb0b83db4a8624fe";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Please enter a Valid Name");
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="h-screen bg-cover w-full p-10 max-[768px]:h-auto">
      <video
        autoPlay
        loop
        muted
        className="h-full w-full object-cover"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="flex justify-center align-middle items-center h-full flex-col gap-4  max-[768px]:justify-normal">
        <div className=" py-5  h-auto w-[80%] px-6 bg-[rgba(15,14,14,0.7)] rounded-xl max-[768px]:w-full max-[768px]:h-auto">
          <div className="flex justify-between flex-wrap w-full items-center max-[768px]:w-full ">
            <p className="text-xl font-bold text-white max-[768px]:w-full max-[768px]:text-center max-[768px]:mb-4">Weather App</p>
            <div className="max-[768px]:w-full max-[768px]:flex max-[768px]:justify-center max-[768px]:flex-col">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter city name"
                className="py-2 px-2 max-[768px]:w-full"
              />
              <button
                onClick={handleSubmit}
                className="border text-white px-8 bg-red-700 font-bold py-2  "
              >
                Get Weather
              </button>
            </div>
          </div>
        </div>
        <div className=" rounded-xl w-[60%] h-auto max-[768px]:w-full max-[768px]:text-wrap max-[768px]:h-auto">
          {isLoading && <p className="text-center text-2xl text-white font-bold">Loading...</p>}
          {error && <p>{error.message}</p>}
          {weatherData && <WeatherDisplay weatherData={weatherData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
