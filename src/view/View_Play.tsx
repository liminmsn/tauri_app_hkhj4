import { play_data } from "@/router/analysis/plot/analysis_net_api_plot_play";
import { useHistoryContext } from "@/hooks/HistoryProvider";
import { useLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Plyr } from "plyr-react";
import Hls from "hls.js";
import "plyr-react/plyr.css";
let i = 0;
export default function Player() {
    const { history } = useHistoryContext();
    const isFirstMount = useRef(true);
    const { url, err, title } = useLoaderData() as typeof play_data;
    const hlsRef = useRef<Hls | null>(null);
    let videoElement: HTMLVideoElement;


    useEffect(() => {
        if (isFirstMount.current) {
            //添加标题
            const controls = document.querySelector('.plyr__controls');
            const p = document.createElement('p');
            p.textContent = title;
            p.className = 'text-white absolute -top-4 left-5 font-bold';
            controls?.appendChild(p);
            // 视频组件
            videoElement = document.querySelector('.plyr__video-wrapper video') as HTMLVideoElement;

            // 进度更新
            videoElement.ontimeupdate = () => {
                if (videoElement.currentTime > 10) {
                    localStorage.setItem('play_current', JSON.stringify({ url, time: videoElement.currentTime }));
                }
            };
            // 刷新页面
            window.addEventListener('beforeunload', () => {
                localStorage.setItem('play_current', JSON.stringify({ url, time: videoElement.currentTime }));
            });

            if (!err && url) {
                if (videoElement) {
                    if (Hls.isSupported()) {
                        const hls = new Hls();
                        hls.attachMedia(videoElement);
                        hls.loadSource(url);
                        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            console.log("HLS视频加载成功");
                            //继续播放
                            const val = localStorage.getItem('play_current');
                            if (val) {
                                const obj = JSON.parse(val);
                                if (url == obj['url']) {
                                    videoElement.currentTime = obj['time'];
                                }
                            }
                            videoElement.play();
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

            isFirstMount.current = false;
            return () => {
                hlsRef.current && hlsRef.current.destroy();
                isFirstMount.current = true;
            };
        }
    }, [url]);

    return <div className="h-full w-full bg-black rounded-none">
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
                            "fullscreen",
                        ],
                    }}
                />
        }
    </div>
}