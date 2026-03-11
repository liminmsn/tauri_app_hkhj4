import Com_Item from "@/components/view/com_Item";
import Com_Link from "@/components/view/com_link";
import { categoryHomePath } from "@/hooks/CateGoryProvider";
import { analysis_body, getAnalysisFun } from "@/router";
import { data_year_onign } from "@/router/analysis/plot/analysis_net_api_plot_year";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function () {
    const { url } = useParams<{ url: string }>();
    const [data, setData] = useState<typeof data_year_onign | null>(null);
    useEffect(() => {
        setData(null);
        analysis_body(url, getAnalysisFun(categoryHomePath(), "year")).then(setData);
    }, [url])

    if (data) {
        return <div className="p-2">
            <div className="grid grid-cols-6 gap-1">
                {
                    data.itemList.map(item => {
                        return <Com_Item key={item.url} item={item} />
                    })
                }
            </div>
            {
                data.page.length > 1 &&
                <div className="flex justify-center gap-2 my-2">
                    {
                        data.page.map(item => {
                            return <div className="flex w-10 text-center" key={item.label}>
                                <Com_Link disabled={item.disabled} label={` ${item.label} `} url={`/video/year/${encodeURIComponent(item.url)}`} />
                            </div>
                        })
                    }
                </div>
            }
        </div>
    } else {
        return <div className="p-2">
            加载中...
        </div>
    }
}