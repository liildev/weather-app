import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "../assets";
import { Filter, TimeAndLocation, TemperatureAndDetails } from "../components";
import { useFetch } from "../hooks";

export default function City() {
  const { name } = useParams();

  const { units, error, loading, weather, setQuery, setUnits } = useFetch(name);

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
