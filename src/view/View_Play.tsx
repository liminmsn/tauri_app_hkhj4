import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
// 1. 新增：引入hls.js（需要先安装）
import Hls from "hls.js";

export default function Player() {
    const { url, err } = useLoaderData() as { url: string, err: any };
    // 2. 新增：创建ref存储hls实例，用于组件卸载时清理
    const hlsRef = useRef<Hls | null>(null);

    useEffect(() => {
        console.log('play_url',url);
        
        const controls = document.querySelector('.plyr__controls');
        const title = document.createElement('p');
        title.textContent = 'hello world'
        title.className = 'text-white absolute -top-4 left-5 font-bold';
        controls?.appendChild(title);

        // 3. 新增：HLS播放支持逻辑（核心新增代码）
        if (!err && url) {
            // 获取Plyr内部的video元素
            const videoElement = document.querySelector('.plyr__video-wrapper video') as any;
            if (videoElement) {
                // 检查浏览器是否支持HLS.js
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    // 将HLS和video元素绑定
                    hls.attachMedia(videoElement);
                    // 加载m3u8地址
                    hls.loadSource(url);
                    // 监听加载成功事件
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        console.log("HLS视频加载成功");
                    });
                    // 监听错误事件
                    hls.on(Hls.Events.ERROR, (event, data) => {
                        console.error("HLS播放错误:", data);
                    });
                    // 保存hls实例到ref
                    hlsRef.current = hls;
                } 
                // 兼容Safari等原生支持HLS的浏览器
                else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                    videoElement.src = url;
                }
            }
        }

        // 4. 新增：组件卸载时清理HLS实例，避免内存泄漏
        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [url, err]);

    // 原有代码完全保留
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