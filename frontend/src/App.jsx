import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/navigation";
import GoBack from "./components/GoBack";

const App = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen relative">
      <ToastContainer />
      <Navigation />
      <main className="lg:w-[85%] w-full bg-gray-50">
        {/* <GoBack /> */}
        <Outlet />
      </main>
    </div>
  );
};

export default App;
