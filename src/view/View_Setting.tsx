import Com_Card from "@/components/view/Com_Card";
import { useThemeContext } from "@/hooks/ThemeProvider"
import { useEffect } from "react";

export default function () {
    const { config, setTheme } = useThemeContext();
    useEffect(() => {
        setTimeout(() => {
            setTheme({
                config: {
                    ...config,
                    // theme: ["#15173D","#982598","#E491C9","#F1E9E9"]
                    theme: ["#6B7445","#839705","#BBCB2E","#6CA651"]
                    // theme: ["#FFD400", "#FFC300", "#FF8C00", '#FF5F00'].reverse()
                },
                setTheme
            })
        });
    }, [])
    return <div className="text-center pt-2">
        <Com_Card>
            <div className="px-10">
                {/* {JSON.stringify(config)} */}
                <button>设置</button>
            </div>
        </Com_Card>
    </div>
}