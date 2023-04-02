import React, { useState } from "react";
import { FiSearch, IoLocationSharp } from "../assets";

export default function Filter({ units, setQuery, setUnits }: IInput) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (
    e: React.FormEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex my-6">
      <div className="flex-items-center w-3/4 space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city...."
          className="text-xl font-light p-2"
        />
        <FiSearch
          size={25}
          className="input-icon"
          onClick={handleSearchClick}
        />

        <IoLocationSharp
          size={25}
          className="input-icon"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex-items-center w-1/4">
        <button name="metric" className="btn-hover" onClick={handleUnitsChange}>
          °C
        </button>

        <p className="text-xl mx-1 cursor-pointer">|</p>

        <button
          name="imperial"
          className="btn-hover"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}
