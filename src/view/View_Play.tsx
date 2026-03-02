import { play_data } from "@/router/analysis/analysis_net_api_play";
import { useHistoryContext } from "@/hooks/HistoryProvider";
import { useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Plyr } from "plyr-react";
import Hls from "hls.js";
import "plyr-react/plyr.css";

export default function Player() {
    const { history } = useHistoryContext();
    const { url, err, title } = useLoaderData() as typeof play_data;
    const hlsRef = useRef<Hls | null>(null);
    let videoElement: HTMLVideoElement;

    function init() {
        //添加标题
        const controls = document.querySelector('.plyr__controls');
        const p = document.createElement('p');
        p.textContent = title;
        p.className = 'text-white absolute -top-4 left-5 font-bold';
        controls?.appendChild(p);
        // 视频组件
        videoElement = document.querySelector('.plyr__video-wrapper video') as HTMLVideoElement;
        // 进度更新
        videoElement.ontimeupdate = (e) => { history.time = String(e.timeStamp) };

        if (!err && url) {
            if (videoElement) {
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.attachMedia(videoElement);
                    hls.loadSource(url);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        console.log("HLS视频加载成功");
                        videoElement.play()
                    });
                    hls.on(Hls.Events.ERROR, (_e) => {
                        console.error("HLS播放错误:", _e);
                    });
                    hlsRef.current = hls;
                } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                    // 兼容Safari等原生支持HLS的浏览器
                    videoElement.src = url;
                }
            }
        }
    }
    
    useEffect(() => {
        init();
        return () => {
            hlsRef.current && hlsRef.current.destroy();
        };
    }, [url, err]);

    return <div className="h-full w-full bg-black">
        {
            err ?
                <div className="w-full pt-20 text-center font-bold">视频资源不见了，看看其它的吧</div> :
                <Plyr
                    autoPlay={true}
                    source={{
                        type: "video",
                        sources: [
                            {
                                src: url,
                                type: "application/x-mpegURL",
                            },
                        ],
                    }}
                    options={{
                        controls: [
                            "play-large",
                            "play",
                            "progress",
                            "current-time",
                            "mute",
                            "volume",
                            "settings",
                            "pip",
                            "fullscreen",
                        ],
                    }}
                />
        }
    </div>
}