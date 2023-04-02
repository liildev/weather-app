import { formatToLocalTime, iconUrlFromCode } from "../services";
import {
  HiSun,
  TbWind,
  IoMdWater,
  BsSunsetFill,
  FaTemperatureHigh,
} from "../assets";

interface Props {
  weather: IWeather;
}

export default function TemperatureAndDetails({ weather }: Props) {
  const {
    icon,
    temp,
    speed,
    sunset,
    details,
    sunrise,
    temp_min,
    temp_max,
    country,
    humidity,
    timezone,
    feels_like,
  } = weather;

  return (
    <div>
      <div className="flex-items-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      <div className="flex-between py-3">
        <img src={iconUrlFromCode(icon)} alt={country} className="w-20" />

        <p className="text-5xl">{`${temp.toFixed()}°`}</p>

        <div className="flex flex-col space-y-2">
          <div className="temperature-item">
            <FaTemperatureHigh size={18} />
            Real fell:
            <span>{`${feels_like.toFixed()}°`}</span>
          </div>

          <div className="temperature-item">
            <IoMdWater size={18} />
            Humidity:
            <span>{`${humidity.toFixed()}%`}</span>
          </div>

          <div className="temperature-item">
            <TbWind size={18} />
            Wind:
            <span>{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex-items-center space-x-2 text-sm py-3">
        <HiSun size={25} />
        <p>
          Rise: <span>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
        </p>
        <p>|</p>

        <BsSunsetFill size={25} />
        <p>
          Set: <span>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
        </p>
        <p>|</p>

        <HiSun size={25} />
        <p>
          High: <span>{`${temp_max.toFixed()}°`}</span>
        </p>
        <p>|</p>

        <HiSun size={25} />
        <p>
          Low: <span>{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}
