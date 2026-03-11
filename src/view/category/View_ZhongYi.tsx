import Com_Item from "@/components/view/com_Item";
import Com_Link from "@/components/view/com_link";
import Com_TipsLabel from "@/components/view/com_tipsLabel"
import { CATEGORY_ZongYi, useCateGoryContext } from "@/hooks/CateGoryProvider";
import { data_move_home_onign } from "@/router/analysis/move/analysis_net_api_move";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom"

export default function () {
    const { cardList, grup } = useLoaderData<typeof data_move_home_onign>();
    const { update } = useCateGoryContext();
    useEffect(() => {
        update({ home: CATEGORY_ZongYi });
    }, []);

    return <div className="p-2 pt-0">
        <Com_TipsLabel label="年度分类" icon="line-md:calendar-twotone" />
        <div className=" grid gap-1 grid-cols-6">
            {
                grup.map(item => {
                    return <Com_Link key={item.url} label={`${item.label}年综艺`} url={`/video/year/${encodeURIComponent(item.url)}`} />
                })
            }
        </div>
        {
            cardList.map((item, idx) => {
                return <div key={idx}>
                    <Com_TipsLabel label={item.title} icon="line-md:calendar-twotone" />
                    <div className="grid gap-1 grid-cols-6">
                        {
                            item.itemList.map(item => {
                                return <Com_Item item={item} key={item.url} />
                            })
                        }
                    </div>
                </div>
            })
        }
    </div>
}