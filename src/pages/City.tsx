import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormattedWeatherData } from "../services";
import { AiOutlineLoading3Quarters } from "../assets";
import { Filter, TimeAndLocation, TemperatureAndDetails } from "../components";

import axios from "axios";

export default function City() {
  const { name } = useParams();
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

  return (
    <div className="max-w-xl mx-auto">
      <Filter setQuery={setQuery} units={units} setUnits={setUnits} />

      {error ? (
        <div className="flex-items-center py-6 text-xl text-cyan-300">
          <p className="uppercase">{error}</p>
        </div>
      ) : loading ? (
        <AiOutlineLoading3Quarters size={40} className="animate-spin mx-auto" />
      ) : weather ? (
        <Fragment>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
        </Fragment>
      ) : null}
    </div>
  );
}
