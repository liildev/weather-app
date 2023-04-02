import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to={"/"} className="text-2xl font-bold">Weather App</Link>
    </header>
  );
}
