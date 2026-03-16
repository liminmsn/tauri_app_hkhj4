import { play_data } from "@/router/analysis/plot/analysis_net_api_plot_play";
import { useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Plyr } from "plyr-react";
import Hls from "hls.js";
import "plyr-react/plyr.css";
import { useMemberContext } from "@/hooks/MemberProvider";
import Com_link from "@/components/view/com_link";

export default function Player() {
    const { member } = useMemberContext();
    if (member) {
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
    } else {
        return <div className="p-2 h-1/2 flex justify-center items-center shouxie">
            <div className="text-center">
                <img className="w-20 mx-auto" src="/logo.png" />
                <h1 className="mt-2 font-bold text-xl">{import.meta.env["VITE_APPNAME"]}</h1>
                <h2 className="opacity-45 mb-2">海量 韩剧 电影 综艺 等你来发现</h2>
                <h2 className="opacity-45 mb-2">Premium可无广告观看所有韩剧</h2>
                <Com_link url="/premium" label="订阅Premium" />
            </div>
        </div>
    }

}