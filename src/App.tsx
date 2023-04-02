import Layout from "./layout";
import { Login, City } from "./pages";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/city/:name" element={<City />} />
      </Route>
    </Routes>
  );
}
