import Com_Card from "@/components/view/com_Card";
import { useThemeContext } from "@/hooks/ThemeProvider";
import { SyntheticEvent } from "react";

const theme_arr = [
    {
        "id": 0,
        "label": "青草绿",
        "theme": ["#a4a946", "#698b32", "#E8E2DB"]
    },
    {
        "id": 1,
        "label": "深褐红",
        "theme": ["#903f22", "#5a0606", "#FFB33F"]
    },
    {
        "id": 2,
        "label": "深空灰",
        "theme": ["#40455b", "#202020", "#e8e8e8"]
    },
    {
        "id": 3,
        "label": "沉默蓝",
        "theme": ["#1A3263", "#547792", "#E8E2DB"]
    }
]

export default function () {
    const { updateTheme } = useThemeContext();
    const local_theme_config = JSON.parse(localStorage.getItem('theme_config')!);

    function onSelect(e: SyntheticEvent<HTMLSelectElement, Event>) {
        console.log(e.currentTarget.value);
        const id = e.currentTarget.value;
        updateTheme(theme_arr[Number(id)]);
    }
    return <div className="text-center pt-10">
        <Com_Card>
            <div className="text-left p-2 px-8">
                <div className="font-bold mb-2 text-xl">设置</div>
                <ul className="text-sm">
                    <li>
                        <label>主题：
                            <select className="shouxie py-1" defaultValue={local_theme_config['id']} onChangeCapture={onSelect}>
                                {
                                    theme_arr.map((item, idx) => {
                                        return <option key={idx} value={item.id} >{item.label}</option>
                                    })
                                }
                            </select>
                        </label>
                    </li>
                    <li>
                        <label>版本：
                            <span className="shouxie text-sm">{import.meta.env['VITE_VERSION']}</span>
                        </label>
                    </li>
                    <li>
                        <label>关于：
                            <span className="shouxie text-sm">开发者@头号玩家</span>
                        </label>
                    </li>
                </ul>
            </div>
        </Com_Card>
    </div>
}