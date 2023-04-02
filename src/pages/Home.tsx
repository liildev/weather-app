import { Link } from "react-router-dom";
import { navLinks } from "../constants";

export default function Home() {
  return (
    <div className="p-10">
      <h1>Weather data in a fast and easy-to-use way</h1>

      <p className="w-2/3 my-5">
        We are providing highly recognisable weather products that make working
        with the weather data a way easier. We work with millions of developers
        around a clock and believe that these benefits might be suitable for
        most of applications, up to the complex enterprise systems.
      </p>

      <ul className="grid grid-cols-3 gap-4">
        {navLinks.map(({ id, path, item }) => (
          <li key={id} className="flex-items-center bg-main w-40 h-10 rounded hover:bg-nav">
            <Link to={path}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
