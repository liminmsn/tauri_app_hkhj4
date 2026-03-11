import Com_Item from "@/components/view/com_Item";
import Com_link from "@/components/view/com_link";
import { analysis_body } from "@/router";
import analysis_net_api_search_move, { data_move_search_onign } from "@/router/analysis/move/analysis_net_api_search_move";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function fromUlr(url: string): string {
    if (url.includes('/search/')) {
        const s = url.replace("/search/", "").replace(".html", "");
        return `/video/search?s=${s}`;
    }
    return `/video/search_list/${encodeURIComponent(url)}`;
}

export default function () {
    const { url } = useParams();
    const [data, setData] = useState<typeof data_move_search_onign | null>(null);

    useEffect(() => {
        setData(null);
        analysis_body(url, analysis_net_api_search_move, import.meta.env['VITE_URL_MOVE']).then(setData);
    }, [url]);

    if (data) {
        if (data.page.length > 0) {
            return <div className="p-2">
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
                                <Com_link disabled={item.disabled} label={` ${item.label} `} url={fromUlr(item.url)} />
                            </div>
                        })
                    }
                </div>
            </div>
        }
        return <div className="p-2 shouxie">
            无数据...
        </div>
    }
    return <div className="p-2 shouxie">
        数据获取中...
    </div>
}