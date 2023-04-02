import { useState } from "react";
import { history } from "../utils";
import { setLocalStorage } from "../libs";
import { AiOutlineLoading3Quarters } from "../assets";

import axios from "axios";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("https://reqres.in/api/login", login);

      if (data && data.token) {
        setLocalStorage("token", data.token);
        history.push("/city/tashkent");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-items-center h-screen">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="text-center text-main text-4xl font-bold">
          Weather App
        </h1>

        <input
          type="text"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />

        <input
          type="password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />

        <button className="bg-main rounded-lg h-12">
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin mx-auto w-6 h-6" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
}
