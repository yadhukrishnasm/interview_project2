
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
    <div className="p-2 rounded-2xl space-x-2 bg-neutral-200">
      <button
        onClick={() => toggleTheme("light")}
        className="p-2 border rounded-lg cursor-pointer border-neutral-300 shodow hover:bg-white"
      >
        Light
      </button>
      <button
        onClick={() => toggleTheme("dark")}
        className="p-2 border rounded-lg cursor-pointer border-neutral-500"
      >
        Dark
      </button>
    </div>
  );
}
