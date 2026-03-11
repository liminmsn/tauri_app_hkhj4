import Icon_bg from "@/components/icon/icon_bg";
import Com_Item from "@/components/view/com_Item";
import Com_Link from "@/components/view/com_link";
import Com_TipsLabel from "@/components/view/com_tipsLabel";
import { data_detail_onign } from "@/router/analysis/plot/analysis_net_api_plot_detail";
import { Link, useLoaderData } from "react-router-dom"

export default function () {
    const { data, url } = useLoaderData<{ url: string, data: typeof data_detail_onign }>();
    const { info, playother_1, playother_2, play_list } = data;

    if (data) {
        return <div className="p-2">
            <div className="relative z-10">
                <div className="p-2 shadow-sm rounded-sm flex overflow-hidden">
                    <div className="rounded-sm absolute left-0 right-0 top-0 bottom-0 -z-1"
                        style={{
                            background: `url(${info.img}),
                                linear-gradient(45deg, rgba(0,0,0,0.5), var(--theme_0))
                                `,
                            backgroundSize: 'auto 100%',
                            backgroundPosition: 'center',
                            backgroundBlendMode: 'color-burn',
                        }} ></div>
                    <div className="flex-1 flex flex-col mr-2">
                        <p className="text-2xl">{info.title}</p>
                        <p className="my-1 text text-2xl"><span className=" text-amber-300 mr-1 font-bold">{info.pingfen}</span>分</p>
                        {info.desc.filter(val => val.t !== "").map(item => {
                            return <p key={item.o}>
                                <span>{item.o}</span>
                                {
                                    item.o == '主演：' ?
                                        item.t.split("、").map(t => {
                                            return <Link className="font-bold text-sm" to={`/video/search?s=${t}`}>{t}&nbsp;</Link>
                                        })
                                        : item.o == "导演：" ? <Link className="font-bold text-sm" to={`/video/search?s=${item.t}`}>{item.t}&nbsp;</Link>
                                            : <span className="">{item.t}</span>

                                }
                            </p>
                        })}
                    </div>
                    <img className="inline min-w-50 rounded-sm " style={{ borderColor: 'var(--theme_1)' }} src={info.img} />
                </div>
            </div>
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
                                            return <span className={`"opacity-40" : ""}`} key={idx}>
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
}