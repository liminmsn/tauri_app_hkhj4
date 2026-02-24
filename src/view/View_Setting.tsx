import { useThemeContext } from "@/hooks/ThemeProvider"
import { useEffect } from "react";

export default function () {
    const theme = useThemeContext();
    useEffect(() => {
        
    }, [])
    return <div>
        {JSON.stringify(theme)}
        设置中心
    </div>
}