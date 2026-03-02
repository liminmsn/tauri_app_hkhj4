import { NetAPI } from "@/api/Net";
import { analysis_body } from "@/router";
import analysis_net_api_ranking, { data_rank_onign } from "@/router/analysis/analysis_net_api_ranking";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function getBGColor(idx: number) {
    const colors = ['bg-red-400 text-white', 'bg-green-400 text-white', 'bg-orange-400 text-white']
    if (colors[idx]) {
        return colors[idx];
    }
    return '';
}

export default function () {
    const [rank, setRank] = useState<typeof data_rank_onign>([]);
    useEffect(() => {
        analysis_body(NetAPI.Rank, analysis_net_api_ranking).then(setRank);
    }, []);
    return <div className="shadow-sm bg-black/40">
        <div className="h-2 theme_0"></div>
        {
            rank.length > 0 ?
                <div className="flex justify-center gap-10 p-2">
                    {
                        rank.map((item, idx) => {
                            return <div key={idx}>
                                <p className="font-bold mb-2">{item.label}</p>
                                <div className="max-h-60 overflow-y-auto">
                                    {item.list.map((a, idx_) => {
                                        return <div key={idx_} className="text-left">
                                            <Link to={`/detail/${window.btoa(a.href)}`} style={{ color: 'var(--theme_1)' }}>
                                                <span
                                                    className={`inline-block px-2 mr-1 mb-1 text-sm text-center bg-black/20
                                                    rounded-sm ${getBGColor(idx_)}`}>{idx_ + 1}
                                                </span>
                                                <span>{a.tit}</span>
                                                <span className="ml-1 opacity-70">{a.score}</span>
                                            </Link>
                                        </div>
                                    })}
                                </div>
                            </div>
                        })
                    }
                </div> :
                <div>
                    <div className="flex justify-center items-center p-2 h-60">
                        <Icon icon={"line-md:beer-twotone-loop"} className="inline" height={30} />
                    </div>
                </div>
        }
        <div className="h-2 theme_0"></div>
    </div>
}