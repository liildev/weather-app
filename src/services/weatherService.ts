import axios from "axios";
import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const getWeatherData = async (searchParams: IQeury) => {
  const { data } = await axios.get(`${BASE_URL}/weather`, {
    params: { ...searchParams, appid: API_KEY },
  });

  return data;
};

const formatCurrentWeather = (data: IData) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const getFormattedWeatherData = async (searchParams: IQeury) =>
  await getWeatherData(searchParams).then(formatCurrentWeather);

const formatToLocalTime = (
  secs: number,
  zone: string,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code: string) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export { iconUrlFromCode, formatToLocalTime, getFormattedWeatherData };
