import Com_Item from "@/components/Com_Item";
import Com_Link from "@/components/Com_Link";
import Com_TipsLabel from "@/components/Com_TipsLabel";
import { data_detail_onign } from "@/router/analysis/analysis_net_api_detail";
import { useLoaderData } from "react-router-dom"

export default function () {
    const { info, playother_1, playother_2, playlist_1, playlist_2 } = useLoaderData<typeof data_detail_onign>();
    return <div className="p-1">
        <div className="py-4 pb-6 px-4 shadow-sm rounded-sm flex text_1 relative" style={{ backgroundSize: "auto 100%", backgroundImage: 'url("/test/bg.svg")' }}>
            <div className="h-full flex-1 mr-6 flex">
                <img className="h-full max-w-60 min-w-60 mr-6" src={info.img} />
                <div className="flex flex-col">
                    <p className="text-2xl">{info.title}</p>
                    <p className="my-2 text-right text-2xl absolute right-4 top-2"><span className=" text-amber-300 mr-1 font-bold">{info.pingfen}</span>分</p>
                    {info.desc.map(item => {
                        return <p key={item.o}>
                            <span>{item.o}</span>
                            <span>{item.t}</span>
                        </p>
                    })}
                </div>
            </div>
        </div>
        {
            playlist_1.length > 0 &&
            <div>
                <Com_TipsLabel label="主路线" icon="line-md:list-3-twotone" />
                <div className="grid grid-cols-6 gap-1">
                    {
                        playlist_1.map(item => {
                            return <Com_Link key={item.url} label={item.label} url={`/play/${window.btoa(item.url)}`} />
                        })
                    }
                </div>
            </div>
        }
        {
            playlist_2.length > 0 &&
            <div>
                <Com_TipsLabel label="备用路线" icon="line-md:list-3-twotone" />
                <div className="grid grid-cols-6 gap-1">
                    {
                        playlist_2.map(item => {
                            return <Com_Link key={item.url} label={item.label} url={`/play/${window.btoa(item.url)}`} />
                        })
                    }
                </div>
            </div>
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