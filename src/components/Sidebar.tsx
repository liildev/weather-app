import { NavLink } from "react-router-dom";
import { navLinks } from "../constants";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        {navLinks.map(({ id, path, item }) => (
          <li key={id} className="mx-4">
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex-center mt-2 p-4 rounded-10 hover:bg-nav ${
                  isActive && "bg-nav"
                }`
              }
            >
              <p className="ml-5 text-sm font-bold">{item}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
