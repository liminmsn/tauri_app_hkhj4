import { createContext, ReactNode, useContext, useEffect, useState } from "react";


export type ThemeContextTypeTheme = {
    id: number;
    label: string;
    theme: string[];
}

export type ThemeContextType = {
    config: ThemeContextTypeTheme,
    setTheme: (theme: ThemeContextType) => void;
};

const initTheme: ThemeContextType = {
    config: {
        id: 0,
        label: "魅惑紫",
        theme: ["#1C0770", "#261CC1", "#3A9AFF", "#F1FF5E"],
    },
    setTheme(newTheme: ThemeContextType) {
        const { theme } = newTheme.config;
        const root = document.documentElement;
        root.style.setProperty("--theme_bg_0", theme[0]);
        root.style.setProperty("--theme_0", theme[1]);
        root.style.setProperty("--theme_1", theme[2]);
        root.style.setProperty("--text_0", theme[3]);
        root.style.setProperty("--plyr-color-main", "var(--theme_0)");
        localStorage.setItem("theme_config", JSON.stringify(newTheme.config));
    }
};

// 从 localStorage 读取
const localTheme = localStorage.getItem("theme_config");
if (localTheme) {
    initTheme.config = JSON.parse(localTheme);
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [themeConfig, setThemeConfig] = useState<ThemeContextType>(initTheme);

    const updateTheme = (newTheme: ThemeContextType) => {
        setThemeConfig(newTheme); //响应更新
        themeConfig.setTheme(newTheme); //设置style存本地
    };

    useEffect(() => { 
        themeConfig.setTheme(themeConfig);
    }, [])

    return (
        <ThemeContext.Provider value={{ ...themeConfig, setTheme: updateTheme }}>
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