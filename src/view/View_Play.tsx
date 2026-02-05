import { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

export default function Player() {
    const { url, err } = useLoaderData() as { url: string, err: any };

    useEffect(() => {
        const controls = document.querySelector('.plyr__controls');
        const title = document.createElement('p');
        title.textContent = 'hello world'
        title.className = 'text-white absolute -top-4 left-5 font-bold';
        controls?.appendChild(title);
    }, []);

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
