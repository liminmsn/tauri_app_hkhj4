import Net, { NetAPI_Move } from "@/api/Net";
import Com_Item from "@/components/view/com_Item";
import Com_link from "@/components/view/com_link";
import analysis from "@/router/analysis";
import analysis_net_api_search_move, { data_move_search_onign } from "@/router/analysis/move/analysis_net_api_search_move";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function () {
    const [searchParams] = useSearchParams();
    const s = searchParams.get('s');
    const [data, setData] = useState<typeof data_move_search_onign | null>(null);

    useEffect(() => {
        if (s) {
            !async function () {
                const res_text = await (await new Net(String(NetAPI_Move.Search).concat(`&wd=${s}`), import.meta.env['VITE_URL_MOVE']).post()).text();
                setData(analysis.init(res_text, analysis_net_api_search_move));
            }()
        } else {
            setData(null);
        }
    }, [s]);

    if (data) {
        if (data.page.length == 0) {
            return <div className="p-2 shouxie">
                没有找到"{JSON.stringify(searchParams.get('s'))}"相关的视频
            </div>
        }

        return <div className="p-2 pt-0">
            <div className="my-1 shouxie">与"{s}"相关的视频如下</div>
            <div className="grid grid-cols-6 gap-1">
                {
                    data.itemList.map(item => {
                        return <Com_Item key={item.url} item={item} />
                    })
                }
            </div>
            <div className="flex justify-center gap-2 my-2">
                {
                    data.page.map(item => {
                        return <div className="flex w-10 text-center" key={item.label}>
                            <Com_link disabled={item.disabled} label={` ${item.label} `} url={`/video/search_list/${encodeURIComponent(item.url)}`} />
                        </div>
                    })
                }
            </div>
        </div>
    }

    if (s == null) {
        return <div className="p-2 h-1/2 flex justify-center items-center shouxie">
            <div className="text-center">
                <img className="w-20 mx-auto" src="/logo.png" />
                <h1 className="mt-2 font-bold text-xl">{import.meta.env["VITE_APPNAME"]}</h1>
                <h2 className="opacity-45">海量 韩剧 电影 综艺 等你来发现</h2>
            </div>
        </div>
    }

    return <div className="p-2 shouxie">
        查询"{JSON.stringify(searchParams.get('s'))}"中...
    </div>
}