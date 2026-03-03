import Com_Card from "@/components/view/com_card";
import { useThemeContext } from "@/hooks/ThemeProvider";
import { SyntheticEvent } from "react";

const theme_arr = [
    {
        "id": 0,
        "label": "复古绿",
        "theme": ["#41431B", "#ECDBBA", "#E8E2DB"]
    },
    {
        "id": 1,
        "label": "深空灰",
        "theme": ["#30364F", "#ACBAC4", "#F0F0DB"]
    },
    {
        "id": 2,
        "label": "沉默蓝",
        "theme": ["#1A3263", "#547792", "#E8E2DB"]
    }
]

export default function () {
    const { updateTheme } = useThemeContext();

    function onSelect(e: SyntheticEvent<HTMLSelectElement, Event>) {
        console.log(e.currentTarget.value);
        const id = e.currentTarget.value;
        updateTheme(theme_arr[Number(id)]);
    }
    return <div className="text-center pt-10">
        <Com_Card>
            <div className="text-left p-2 px-8">
                <div className="font-bold mb-2 text-xl">设置</div>
                <label>主题：
                    <select onChangeCapture={onSelect}>
                        {
                            theme_arr.map((item, idx) => {
                                return <option key={idx} value={item.id} >{item.label}</option>
                            })
                        }
                    </select>
                </label>
            </div>
        </Com_Card>
    </div>
}