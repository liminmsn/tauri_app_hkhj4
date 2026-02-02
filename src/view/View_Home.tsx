import Com_Item from "@/components/Com_Item";
import Com_TipsLabel from "@/components/Com_TipsLabel";
import { data_home_onign } from "@/router/analysis/analysis_net_api_home";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom"

export default function () {
    const { cardList, itemList, grup } = useLoaderData<typeof data_home_onign>();
    const [cardList_current, setCardListCurrent] = useState(cardList[0]);

    useEffect(() => {
    }, [])

    return <div className="p-1">
        <div className="py-4 pb-6 px-4 h-80 shadow-sm rounded-sm flex text_1" style={{ backgroundSize: "100% auto", backgroundImage: 'url("/test/bg.svg")' }}>
            <div className="h-full flex-1 mr-6 flex">
                <img className="h-full max-w-50 min-w-50 mr-6" src={cardList_current.img} />
                <div className="flex flex-col">
                    <p className="text-2xl">{cardList_current.info.title}</p>
                    <p className="my-2 text-right text-2xl"><span className=" text-amber-300 mr-1 font-bold">{cardList_current.info.fen}</span>分</p>
                    <p>主演：{cardList_current.info.ul[0]}</p>
                    <div className="grid grid-cols-2 grid-rows-2 my-2">
                        <span>类型：{cardList_current.info.ul[1]}</span>
                        <span>导演：{cardList_current.info.ul[2]}</span>
                        <span>地区：{cardList_current.info.ul[3]}</span>
                        <span>年份：{cardList_current.info.ul[4]}</span>
                    </div>
                    <p>剧情：{cardList_current.info.desc2}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-3 gap-1">
                {
                    cardList.map(item => {
                        return <img
                            className="h-full max-w-full w-full cursor-pointer"
                            onMouseEnter={() => setCardListCurrent(item)}
                            style={
                                cardList_current == item ?
                                    { outline: '2px var(--theme_bg_0) solid' } :
                                    {}
                            }
                            key={item.url}
                            src={item.img} />
                    })
                }
            </div>
        </div>
        <Com_TipsLabel label="年度分类" icon="line-md:thumbs-up-twotone" />
        <div className=" grid gap-1 grid-cols-6">
            {
                grup.map(item => {
                    return <Link key={item.label} to={`/year/${encodeURIComponent(item.url)}`}
                        className="
                            hover:shadow-none
                            active:shadow-md
                            p-1
                            theme_0
                            shadow-sm 
                            rounded-br-sm 
                            cursor-pointer">
                        <span className="text-sm">{item.label}</span>
                    </Link>
                })
            }
        </div>
        <Com_TipsLabel label="连载更新" icon="line-md:thumbs-up-twotone" />
        <div className="grid gap-1 grid-cols-6">
            {
                itemList.map(item => {
                    return <Com_Item item={item} key={item.url} />
                })
            }
        </div>
    </div>
}

