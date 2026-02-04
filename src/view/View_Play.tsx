import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { Plyr } from "plyr-react";
import Hls from "hls.js";
import "plyr-react/plyr.css";

export default function Player() {
    const { url } = useLoaderData() as { url: string };
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    useEffect(() => {

        const video = videoRef.current;
        if (!video) return;

        // Safari / iOS 原生支持 m3u8
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
            return;
        }

        // 其他浏览器用 hls.js
        if (Hls.isSupported()) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
                // ⚠️ 如果源站有 Referer 校验
                xhrSetup(xhr) {
                    xhr.setRequestHeader("Referer", "https://www.hanjudada.com");
                },
            });

            hls.loadSource(url);
            hls.attachMedia(video);
            hlsRef.current = hls;
        }

        return () => {
            hlsRef.current?.destroy();
            hlsRef.current = null;
        };
    }, []);

    return <div className="h-full w-full bg-black">
        <Plyr
            source={{
                type: "video",
                sources: [
                    {
                        src: url, // 这里必须有，但真正播放由 hls.js 接管
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
    </div>
}
