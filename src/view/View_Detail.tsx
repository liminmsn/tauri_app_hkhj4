import Icon_bg from "@/components/icon/icon_bg";
import Com_Item from "@/components/view/com_Item";
import Com_Link from "@/components/view/com_Link";
import Com_TipsLabel from "@/components/view/com_TipsLabel";
import { data_detail_onign } from "@/router/analysis/plot/analysis_net_api_plot_detail";
import { useLoaderData } from "react-router-dom"

export default function () {
    const { data, url } = useLoaderData<{ url: string, data: typeof data_detail_onign }>();
    const { info, playother_1, playother_2, play_list } = data;

    return <div className="p-1">
        <Icon_bg>
            <div className="py-4 pb-6 px-4 shadow-sm rounded-sm flex text_1 relative">
                <div className="h-full flex-1 mr-6 w-full flex">
                    <img className="h-full max-w-50 min-w-50 rounded-sm" style={{ borderColor: 'var(--theme_1)' }} src={info.img} />
                    <div className="flex flex-col ml-2">
                        <p className="text-2xl">{info.title}</p>
                        <p className="my-2 text-right text-2xl absolute right-4 top-2"><span className=" text-amber-300 mr-1 font-bold">{info.pingfen}</span>分</p>
                        {info.desc.filter(val => val.t !== "").map(item => {
                            return <p key={item.o}>
                                <span>{item.o}</span>
                                <span>{item.t}</span>
                            </p>
                        })}
                    </div>
                </div>
            </div>
        </Icon_bg>
        {
            play_list.map((item_gory, idx) => {
                return <div key={idx}>
                    {
                        item_gory.length > 0 &&
                        <div>
                            <Com_TipsLabel label={`${idx == 0 ? "主路线" : `备用路线${idx}`}`} icon="line-md:list-3-twotone" />
                            <div className="grid grid-cols-6 gap-1">
                                {
                                    item_gory.map((item, idx) => {
                                        return <span className={`"opacity-40" : ""}`} key={item.url}>
                                            <Com_Link key={item.url} label={item.label} url={`/video/play/${window.btoa(item.url)}`} />
                                        </span>
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            })
        }
        <Com_TipsLabel label="相关视频" icon="line-md:youtube-twotone" />
        <div className=" grid grid-cols-6 gap-1">
            {
                playother_1.map(item => {
                    return <Com_Item key={item.url} item={item} />
                })
            }
        </div>
        <Com_TipsLabel label="同时在看" icon="line-md:thumbs-up-twotone" />
        <div className=" grid grid-cols-6 gap-1">
            {
                playother_2.map(item => {
                    return <Com_Item key={item.url} item={item} />
                })
            }
        </div>
    </div>
}