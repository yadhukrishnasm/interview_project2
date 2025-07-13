import { LogOut, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ThemeToggle() {
  const navigate = useNavigate();

  const toggleTheme = (theme: string) => {
    switch (theme) {
      case "light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      case "dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
    }
  };

  return (
    <div className="p-2 rounded-2xl space-x-2 bg-neutral-200 dark:bg-black">
      <button
        onClick={() => toggleTheme("light")}
        className="p-2 border rounded-lg cursor-pointer border-neutral-300 shodow hover:bg-accent dark:text-white"
      >
        <Sun />
      </button>
      <button
        onClick={() => toggleTheme("dark")}
        className="p-2 border rounded-lg cursor-pointer border-neutral-300 shodow hover:bg-accent dark:text-white"
      >
        <Moon />
      </button>
      <button
        onClick={() => navigate("/")}
        className="p-2 border rounded-lg cursor-pointer border-neutral-300 shodow hover:bg-accent dark:text-white text-red-500"
      >
        <LogOut />
      </button>
    </div>
  );
}
