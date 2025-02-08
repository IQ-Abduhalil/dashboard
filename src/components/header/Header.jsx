import { useContext } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Menu from "../../assets/icons/menu-bar.png";
import Person from "../../assets/icons/personal.png";
import { AuthContext } from "../../context/TokenContext";

export function Header() {
  const [open, setOpen] = useState(false);

  const { token, setToken } = useContext(AuthContext);

  const handleLogOut = () => {
    setToken(localStorage.removeItem("myToken"));
  };

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
          {/* <button onClick={handleOpenBtn} className="cursor-pointer">
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
          </ul> */}
          <Link to="/">Home</Link>
          <button
            onClick={handleLogOut}
            className="flex gap-3 cursor-pointer border-2 border-cyan-500 items-center px-2 py-1 rounded-lg text-xs md:text-base font-semibold "
          >
            <img width="20px" height="20px" src={Person} alt="admin" /> Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
