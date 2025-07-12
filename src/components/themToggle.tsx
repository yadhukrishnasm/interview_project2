import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {

  const toggleTheme = (theme: string) => {
    switch (theme) {
      case "light":
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
        break;
      case "dark":
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        break;
    }
  };

  return (
    <div className="p-2 rounded-2xl space-x-2 bg-neutral-200 dark:bg-black">
      <button
        onClick={() => toggleTheme("light")}
        className="p-2 border rounded-lg cursor-pointer border-neutral-300 shodow hover:bg-accent dark:text-white"
      >
        <Sun/>
      </button>
      <button
        onClick={() => toggleTheme("dark")}
        className="p-2 border rounded-lg cursor-pointer border-neutral-300 shodow hover:bg-accent dark:text-white"
      >
        <Moon/>
      </button>
    </div>
  );
}
