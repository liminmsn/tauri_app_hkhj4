import { play_data } from "@/router/analysis/analysis_net_api_play";
import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { Plyr } from "plyr-react";
import Hls from "hls.js";
import "plyr-react/plyr.css";

export default function Player() {
    const { url, err, title } = useLoaderData() as typeof play_data;
    const hlsRef = useRef<Hls | null>(null);

    useEffect(() => {
        const controls = document.querySelector('.plyr__controls');
        const p = document.createElement('p');
        p.textContent = title;
        p.className = 'text-white absolute -top-4 left-5 font-bold';
        controls?.appendChild(p);

        if (!err && url) {
            const videoElement = document.querySelector('.plyr__video-wrapper video') as any;
            if (videoElement) {
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.attachMedia(videoElement);
                    hls.loadSource(url);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        console.log("HLS视频加载成功");
                    });
                    hls.on(Hls.Events.ERROR, (event, data) => {
                        console.error("HLS播放错误:", data);
                    });
                    hlsRef.current = hls;
                }
                // 兼容Safari等原生支持HLS的浏览器
                else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                    videoElement.src = url;
                }
            }
        }
        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [url, err]);

    return <div className="h-full w-full bg-black">
        {
            err ?
                <div className="w-full pt-20 text-center font-bold">视频资源不见了，看看其它的吧</div> :
                <Plyr
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
                            "airplay",
                            "fullscreen",
                        ],
                    }}
                />
        }
    </div>
}