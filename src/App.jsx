import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import { About } from "./pages/about/About";
import { Login } from "./pages/login/Login";
import { Brands } from "./pages/brands/Brands";
import { Cars } from "./pages/cars/Cars";
import { Models } from "./pages/models/Models";
import { Cities } from "./pages/cities/Cities";
import { Location } from "./pages/locations/Location";
import { Categories } from "./pages/home/Categories";

export default function App() {
  const token = localStorage.getItem("myToken");

  if (token) {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/location" element={<Location />} />
          <Route path="/models" element={<Models />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }
}
