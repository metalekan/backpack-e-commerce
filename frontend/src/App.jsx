import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/navigation";

const App = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen relative">
      <ToastContainer />
      <Navigation />
      <main className="lg:w-[85%] w-full p-4 bg-purple-50">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
