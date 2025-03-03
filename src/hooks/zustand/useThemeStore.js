import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,

      toggleTheme: () =>
        set((state) => {
          const theme = !state.isDarkMode;
          return { isDarkMode: theme };
        }),
    }),
    {
      name: "theme-storage",
    }
  )
);

export default useThemeStore;
