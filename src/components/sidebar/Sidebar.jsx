import { NavLink } from "react-router-dom";
import Settings from "../../assets/icons/settings.svg";
import Cars from "../../assets/icons/cars.svg";
import Location from "../../assets/icons/location.svg";
import City from "../../assets/icons/city.svg";
import Models from "../../assets/icons/models.svg";
import Brands from "../../assets/icons/brands.svg";

export function Sidebar() {
  return (
    <div className="bg-blue-900 min-h-screen">
      <div className="px-1 py-4 ">
        <p className="text-center text-white font-bold text-lg md:text-2xl">
          AutozoomAdmin
        </p>
        <nav className="w-[200px] md:w-[300px]  mt-6 ">
          <ul className="flex flex-col gap-3 ">
            <li className="  text-white font-medium text-base md:text-lg">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "  bg-blue-500 flex gap-2 px-4 rounded-md py-2"
                    : "  flex gap-2 px-4 rounded-md py-2"
                }
              >
                <img width="20px" height="20px" src={Settings} alt="settings" />{" "}
                Categories
              </NavLink>
            </li>
            <li className="  text-white font-medium text-base md:text-lg">
              <NavLink
                to="/brands"
                className={({ isActive }) =>
                  isActive
                    ? "  bg-blue-500 flex gap-2 px-4 rounded-md py-2"
                    : "  flex gap-2 px-4 rounded-md py-2"
                }
              >
                <img width="20px" height="20px" src={Brands} alt="brands" />{" "}
                Brands
              </NavLink>
            </li>
            <li className="  text-white font-medium text-base md:text-lg">
              <NavLink
                to="/models"
                className={({ isActive }) =>
                  isActive
                    ? "  bg-blue-500 flex gap-2 px-4 rounded-md py-2"
                    : "  flex gap-2 px-4 rounded-md py-2"
                }
              >
                <img width="20px" height="20px" src={Models} alt="Models" />{" "}
                Models
              </NavLink>
            </li>
            <li className="  text-white font-medium text-base md:text-lg">
              <NavLink
                to="/location"
                className={({ isActive }) =>
                  isActive
                    ? "  bg-blue-500 flex gap-2 px-4 rounded-md py-2"
                    : "  flex gap-2 px-4 rounded-md py-2"
                }
              >
                <img width="20px" height="20px" src={Location} alt="location" />{" "}
                Location
              </NavLink>
            </li>
            <li className="  text-white font-medium text-base md:text-lg">
              <NavLink
                to="/cities"
                className={({ isActive }) =>
                  isActive
                    ? "  bg-blue-500 flex gap-2 px-4 rounded-md py-2"
                    : "  flex gap-2 px-4 rounded-md py-2"
                }
              >
                <img width="20px" height="20px" src={City} alt="city" /> Cities
              </NavLink>
            </li>
            <li className="  text-white font-medium text-base md:text-lg">
              <NavLink
                to="/cars"
                className={({ isActive }) =>
                  isActive
                    ? "  bg-blue-500 flex gap-2 px-4 rounded-md py-2"
                    : "  flex gap-2 px-4 rounded-md py-2"
                }
              >
                <img width="20px" height="20px" src={Cars} alt="cars" /> Cars
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
