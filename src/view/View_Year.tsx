import Com_Item from "@/components/view/Com_Item"
import { data_year_onign } from "@/router/analysis/analysis_net_api_year"
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom"

export default function () {
    const { itemList } = useLoaderData<typeof data_year_onign>();

    useEffect(() => {
    }, [itemList])
    return <div className="p-1">
        <div className="grid grid-cols-6 gap-1">
            {
                itemList.map(item => {
                    return <Com_Item key={item.url} item={item} />
                })
            }
        </div>
    </div>
}