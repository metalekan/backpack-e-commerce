import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/navigation";

const App = () => {
  return (
    <div className="flex w-screen min-h-screen">
      <ToastContainer />
      <Navigation />
      <main className="llg:w-[85%] w-full h-full bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
