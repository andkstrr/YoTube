import { MdDarkMode, MdLightMode } from "react-icons/md";
import useThemeStore from "../hooks/zustand/useThemeStore";

const ThemeButton = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme} className="cursor-pointer">
      {isDarkMode ? (
        <MdLightMode className="text-white w-10 h-10" />
      ) : (
        <MdDarkMode className="text-black w-10 h-10" />
      )}
    </button>
  );
};

export default ThemeButton;
