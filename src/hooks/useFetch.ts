import { useState, useEffect } from "react";
import { getFormattedWeatherData } from "../services";

import axios from "axios";

export default function useFetch(name: string | undefined) {
  const [units, setUnits] = useState("metric");
  const [error, setError] = useState("");
  const [query, setQuery] = useState({ q: name });
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<IWeather | any>(null);

  useEffect(() => {
    if (name) {
      setQuery({ q: name });
    }
  }, [name]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);

        const data = await getFormattedWeatherData({ ...query, units });

        setError("");
        setWeather(data);
      } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
          setError(e.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query, units]);

  return { units, error, loading, weather, setQuery, setUnits };
}
