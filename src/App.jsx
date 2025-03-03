import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import { useEffect } from "react";
import useThemeStore from "./hooks/zustand/useThemeStore";
import LayoutRoot from "./layouts/LayoutRoot";

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen dark:bg-black dark:text-white p-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutRoot />}>
            <Route path="/" element={<Home />} />
            <Route path="/watch" element={<Watch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
