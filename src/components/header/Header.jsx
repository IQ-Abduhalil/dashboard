import { useState } from "react";
import { NavLink } from "react-router-dom";
import Menu from "../../assets/icons/menu-bar.png";
import Person from "../../assets/icons/personal.png";

export function Header() {
  const [open, setOpen] = useState(false);

  const handleOpenBtn = () => {
    setOpen(true);
  };
  const handleCloseBtn = () => {
    setOpen(false);
  };
  return (
    <header>
      <div className="container mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <button onClick={handleOpenBtn} className="cursor-pointer">
            <img src={Menu} alt="menu" width="30px" height="30px" />
          </button>
          <ul
            onClick={handleCloseBtn}
            className={`flex flex-col gap-3 absolute top-14 bg-blue-400 ${
              open ? "inline-block" : "hidden"
            }`}
          >
            <li className="   font-medium text-lg">
              <NavLink to="/">Settings</NavLink>
            </li>
            <li className="    font-medium text-lg">
              <NavLink to="/brands">Brands</NavLink>
            </li>
            <li className="  font-medium text-lg">
              <NavLink to="/models">Models</NavLink>
            </li>
            <li className="  font-medium text-lg">
              <NavLink to="/location">Location</NavLink>
            </li>
            <li className="    font-medium text-lg">
              <NavLink to="/cities"> Cities</NavLink>
            </li>
            <li className="    font-medium text-lg">
              <NavLink to="/cars"> Cars</NavLink>
            </li>
          </ul>
          <button className="flex gap-4 cursor-pointer border-2 border-cyan-500 items-center px-3 py-1 rounded-lg text-base font-semibold ">
            <img width="30px" height="30px" src={Person} alt="admin" /> Admin
          </button>
        </div>
      </div>
    </header>
  );
}
