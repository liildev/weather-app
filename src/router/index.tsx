import { useEffect } from "react";
import { useAuth } from "../hooks";
import { history } from "../utils";
import { Login, City } from "../pages";
import { Route, Routes } from "react-router-dom";

import Layout from "../layout";

export default function Router() {
  const isAuth = useAuth();

  useEffect(() => {
    if (!isAuth) {
      history.push("/sign-in");
    }
  }, [isAuth]);

  return (
    <Routes>
      <Route path="/sign-in" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/city/:name" element={<City />} />
      </Route>
    </Routes>
  );
}
