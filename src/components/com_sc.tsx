import { NetAPI_Move } from "@/api/Net";
import { categoryHomePath, useCateGoryContext } from "@/hooks/CateGoryProvider";
import { analysis_body } from "@/router";
import analysis_net_api_search_tips_move, { data_move_search_tips_onign } from "@/router/analysis/move/analysis_net_api_search_tips_move";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Com_link from "./view/com_link";
import { getBGColor } from "@/view/category/plot/View_ranking";

export default function () {
    const navigate = useNavigate();
    const [ipt_focus, setiptFocus] = useState(false);
    const [tips, setTips] = useState<typeof data_move_search_tips_onign | null>(null);

    useEffect(() => {
        if (ipt_focus) {
            navigate("/video/search");
        }
        if (tips == null) {
            analysis_body(NetAPI_Move.Search, analysis_net_api_search_tips_move, import.meta.env["VITE_URL_MOVE"]).then(setTips)
        }
    }, [ipt_focus])

    return <form className="flex z-20" method="GET" action="/video/search">
        <div className="theme_1 flex items-center rounded-sm px-1 text-sm relative">
            <Icon className="scale-90" icon="line-md:search-twotone" width="24" />
            <input className="p-0!" type="text" name="s" placeholder="片名 导演 演员..."
                onFocus={() => setiptFocus(true)}
                onBlur={() => setTimeout(() => {
                    setiptFocus(false)
                }, 450)} />
            <div
                style={{ borderColor: 'var(--theme_0)', backgroundColor: 'color-mix(in srgb, var(--theme_1) 5%, rgba(0,0,0,0.1))' }}
                className={`
                    ${ipt_focus ? 'top-8 rounded-sm shadow-md border opacity-100' : '-top-60 opacity-0'}
                    transition-all -z-1 absolute bg-black/20 backdrop-blur-xs p-1 left-0 w-full overflow-auto max-h-60 min-h-40
                `}>
                {
                    tips && <div>
                        <span>{tips?.title}</span>
                        <div className="mt-1 flex flex-col gap-1">
                            {
                                tips?.host_list.map((item, idx) => {
                                    return <div className="flex text-sm" key={idx}>
                                        <div className={`text-sm px-2 mr-1 rounded-sm self-center ${getBGColor(idx) || 'theme_0'}`}>{idx + 1}</div>
                                        <Com_link label={item.label} url={`/video/detail/${window.btoa(item.url)}`} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
        <input style={{ backgroundColor: 'var(--theme_1)' }} className="p-0! px-2! ml-1" type="submit" value="搜索" />
    </form>
}