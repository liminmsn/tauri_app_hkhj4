import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type ThemeContextTypeTheme = {
    id: number;
    label: string;
    theme: string[];
}

type ThemeContextType = {
    config: ThemeContextTypeTheme;
    updateTheme: (theme: Partial<ThemeContextTypeTheme>) => void;
};

let initTheme: ThemeContextTypeTheme = {
    "id": 0,
    "label": "青草绿",
    "theme": ["#a4a946", "#698b32", "#E8E2DB"]
};

const localTheme = localStorage.getItem("theme_config");
if (localTheme) {
    initTheme = JSON.parse(localTheme);
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeConfig, setThemeConfig] = useState<ThemeContextTypeTheme>(initTheme);

    function setTheme(themeConfig: ThemeContextTypeTheme) {
        const { theme } = themeConfig;
        const root = document.documentElement;
        root.style.setProperty("--theme_0", theme[0]);
        root.style.setProperty("--theme_1", theme[1]);
        root.style.setProperty("--text_0", theme[2]);
        root.style.setProperty("--plyr-color-main", "var(--theme_0)");
        localStorage.setItem("theme_config", JSON.stringify(themeConfig));
    }

    const updateTheme = (newTheme: Partial<ThemeContextTypeTheme>) => {
        const theme = { ...themeConfig, ...newTheme };
        setThemeConfig(theme);
        setTheme(theme); //设置style存本地
    };

    useEffect(() => {
        setTheme(themeConfig);
    }, [])

    return (
        <ThemeContext.Provider value={{ config: themeConfig, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// ✅ 真正的 Hook
export function useThemeContext() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useThemeContext must be used within ThemeProvider");
    }

    return context;
}