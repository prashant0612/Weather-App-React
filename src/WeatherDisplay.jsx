import React from "react";
import weather1 from "/weather icon/animated/day.svg";
import weather2 from "/weather icon/animated/night.svg";
import weather3 from "/weather icon/animated/cloudy-day-1.svg";
import weather4 from "/weather icon/animated/cloudy-night-1.svg";
import weather5 from "/weather icon/animated/cloudy.svg";
import weather6 from "/weather icon/animated/cloudy.svg";
import weather7 from "/weather icon/animated/cloudy.svg";
import weather8 from "/weather icon/animated/cloudy.svg";
import weather9 from "/weather icon/animated/rainy-7.svg";
import weather10 from "/weather icon/animated/rainy-7.svg";
import weather11 from "/weather icon/animated/rainy-3.svg";
import weather12 from "/weather icon/animated/rainy-7.svg";
import weather13 from "/weather icon/animated/thunder.svg";
import weather14 from "/weather icon/animated/thunder.svg";
import weather15 from "/weather icon/animated/snowy-3.svg";
import weather16 from "/weather icon/animated/snowy-6.svg";

const WeatherDisplay = ({ weatherData }) => {
  console.log(weatherData);

  // Parse and display weather data here
  const { city, list } = weatherData;
  const firstForecast = weatherData.list[0];

  // converting temp - kelvin to celcius
  function kalToCel(temp) {
    return Math.floor(temp - 273.15);
  }
  var fahrenheitTemperature = firstForecast.main.temp;
  var celsiusTemperature = kalToCel(fahrenheitTemperature) + "°C";

  // Converting timezone into a time
  function getTimeWithTimeZone(timeZone) {
    // Current time
    const now = new Date();
    // Get current UTC time in milliseconds
    const utcTime = now.getTime();
    // Calculate the time for the given timezone
    const timeWithTimeZone = utcTime + timeZone * 1000;
    // Create a new Date object with the adjusted time
    const adjustedTime = new Date(timeWithTimeZone);
    // Define options for formatting
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC", // Using UTC as a basis
    };
    // Create a formatter
    const formatter = new Intl.DateTimeFormat("en-US", options);
    // Format the adjusted time
    const formattedTime = formatter.format(adjustedTime);
    return formattedTime;
  }

  //FOR SUNRISE
  const sunRise = city.sunrise;
  // Convert UNIX timestamp to milliseconds
  const sunRiseMilliseconds = sunRise * 1000;
  // Create a new Date object using the converted timestamp
  const sunRiseDate = new Date(sunRiseMilliseconds);
  // Get hours, minutes, and seconds
  const riseHr = sunRiseDate.getHours();
  const riseMin = sunRiseDate.getMinutes();

  // FOR SUNSET
  const sunSet = city.sunset;
  // Convert UNIX timestamp to milliseconds
  const sunSetMilliseconds = sunSet * 1000;
  // Create a new Date object using the converted timestamp
  const sunSetDate = new Date(sunSetMilliseconds);
  // Get hours, minutes, and seconds
  const setHr = sunSetDate.getHours();
  const setMin = sunSetDate.getMinutes();

  //HUMIDITY
  function convertHumidityToPercentage(apiValue) {
    const maxValue = 100; // Maximum value for humidity is usually 100
    const percentage = (apiValue / maxValue) * 100;
    return percentage;
  }

  //VISIBLITY
  function convertVisiblityToMiles(meters) {
    const metersInOneMile = 1609.34; // 1 mile is approximately 1609.34 meters
    return Math.floor(meters / metersInOneMile);
  }

  //WIND SPEED
  function convertWindSpeedToMph(speedMps) {
    const mph = speedMps * 2.23694;
    return Math.floor(mph);
  }

  //WEATHER ICON
  const weatherMapping = {
    "01d": weather1, // clear sky day
    "01n": weather2,
    "02d": weather3,
    "02n": weather4,
    "03d": weather5,
    "03n": weather6,
    "04d": weather7,
    "04n": weather8,
    "09d": weather9,
    "09n": weather10,
    "10d": weather11,
    "10n": weather12,
    "11d": weather13,
    "11n": weather14,
    "13d": weather15,
    "13n": weather16,
  };

  return (
    <>
      <div className="px-10 bg-[rgba(15,14,14,0.7)] max-[768px]:text-md max-[768px]:h-auto">
        <div className="flex justify-between items-center max-[768px]:flex-wrap">
          <p className="text-6xl font-bold text-white max-[768px]:w-full max-[768px]:mt-5 flex">
            {celsiusTemperature} <img src={weatherMapping[list[0].weather[0].icon]} alt="img" />
          </p>

          <div className="flex flex-col text-right text-white py-4 max-[768px]:w-full">
            <h2 className=" font-semibold text-xl ">{city.name}</h2>
            <p>{getTimeWithTimeZone(city.timezone)}</p>
            <span className="flex justify-end">
              <p className="mr-4">H:{city.coord.lat.toFixed(2)}°</p>
              <p>L:{city.coord.lon.toFixed(2)}°</p>
            </span>
            <span>
              <p>
                Sunrise: {riseHr}hr:{riseMin}min AM
              </p>
              <p>
                Sunset: {setHr}hr:{setMin}min PM
              </p>
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(15,14,14,0.7)] mt-10 text-white h-auto ease-linear 0.5s transition-all">
        <div className="flex flex-wrap justify-around p-5 gap-7 px-20 max-[768px]:px-0">
          <p className="h-20 w-[30%] bg-black font-semibold flex flex-col text-center justify-center text-wrap">
            Feels Like <span>{kalToCel(list[0].main.feels_like)}°C</span>
          </p>
          <p className="h-20 w-[30%] bg-black font-semibold flex flex-col text-center justify-center text-wrap">
            Humidity{" "}
            <span>{convertHumidityToPercentage(list[0].main.humidity)}%</span>
          </p>
          <p className="h-20 w-[30%] bg-black font-semibold flex flex-col text-center justify-center text-wrap">
            Pressure <span>{list[0].main.pressure} pa</span>
          </p>
          <p className="h-20 w-[30%] bg-black font-semibold flex flex-col text-center justify-center text-wrap">
            Visibility{" "}
            <span>{convertVisiblityToMiles(list[0].visibility)} miles</span>
          </p>
          <p className="h-20 w-[30%] bg-black font-semibold flex flex-col text-center justify-center text-wrap">
            Wind Speed{" "}
            <span>{convertWindSpeedToMph(list[0].wind.speed)} mi/h</span>
          </p>
          <p className="h-20 w-[30%] bg-black font-semibold flex flex-col text-center justify-center text-wrap">
            Population <span>{city.population.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default WeatherDisplay;
