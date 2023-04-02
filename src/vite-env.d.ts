/// <reference types="vite/client" />

interface IQeury {
  q: string | undefined;
  units?: string;
  lat?: string;
  lon?: string;
}

interface IInput {
  setQuery: (IQeury) => void;
  setUnits: (string) => void;
  units: string;
}

interface ICoord {
  lat: number;
  lon: number;
}

interface IMiniWeather {
  main: { details: string };
  icon: string;
}

interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

interface ISys {
  country: string;
  sunrise: string;
  sunset: string;
}

interface IWeather {
  dt: number;
  lat: number;
  lon: number;
  icon: string;
  name: string;
  details: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  sunrise: number;
  sunset: number;
  speed: number;
  country: string;
  humidity: number;
  timezone?: string;
  feels_like: number;
}

interface IData {
  dt: number;
  sys: ISys;
  name: string;
  main: IMain;
  coord: ICoord;
  weather: IMiniWeather[];
  wind: { speed: string };
}
