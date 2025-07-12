import { Routes, Route } from "react-router-dom";
import Signin from "./pages/signIn";
import Dashboard from "./pages/dashboard";
import ThemeToggle from "./components/themToggle";

function App() {
  return (
    <div className=" dark:bg-zinc-900 dark:text-white bg-neutral-200">
      <nav className="flex justify-between h-[6vh] py-3 items-baseline px-5">
        <div className="font-bold font-serif text-2xl text-red-500">
          Appointment Sheduler
        </div>
        <ThemeToggle />
      </nav>
      <div className=" h-[93vh] relative overflow-scroll">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
