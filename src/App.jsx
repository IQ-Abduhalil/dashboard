import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import Layout from "./pages/layout/Layout";
import { About } from "./pages/about/About";
import { Login } from "./pages/login/Login";
import { Brands } from "./pages/brands/Brands";
import { Cars } from "./pages/cars/Cars";
import { Models } from "./pages/models/Models";
import { Cities } from "./pages/cities/Cities";
import { Location } from "./pages/locations/Location";
import { Categories } from "./pages/home/Categories";
import { AuthContext } from "./context/TokenContext";

export default function App() {
  const { token } = useContext(AuthContext);
  console.log(token);
  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <Route path="/" element={<Layout />}>
          <Route index element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/location" element={<Location />} />
          <Route path="/models" element={<Models />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
}
