import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "../../components/header/Header";
import { Sidebar } from "../../components/sidebar/Sidebar";

function Layout() {
  return (
    <div className="flex   ">
      <Sidebar />
      <div className="layout__right    size-full right-0">
        <Header />
        <div className="  min-h-full   px-8 py-4">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Layout;
