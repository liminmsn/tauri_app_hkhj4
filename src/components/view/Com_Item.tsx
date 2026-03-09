import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Link } from "react-router-dom";
type propsType = {
    item: {
        url: string;
        img: string;
        label: string;
        info: string;
        info2?: string;
    }
}

export default function ({ item }: propsType) {

    const [isErr, setIsErr] = useState(false);

    return <div key={item.url} className="
                    group
                    active:scale-90
                    overflow-hidden 
                    cursor-pointer
                    relative
                    flex flex-col z-10">
        <Link to={`/video/detail/${window.btoa(item.url)}`}>
            {/* {item.url} */}
            {/* <div className="theme_1 h-1" style={{ backgroundSize: "100% auto", backgroundImage: 'url("/test/bg.svg")' }}></div> */}
            <div className="flex justify-center items-center h-55 lg:h-70 relative overflow-y-hidden theme_0 rounded-sm shadow-sm">
                <span className="absolute z-2 top-0 left-0 text-sm bg-black/20 px-1 rounded-tl-sm rounded-br-sm backdrop-blur-xs">{item.info}</span>
                {
                    isErr ?
                        <div>
                            <Icon icon="line-md:youtube-twotone" width="40" />
                        </div> :
                        <img className="
                        min-w-full
                        h-full
                        absolute 
                        transition"
                            onError={() => setIsErr(true)}
                            src={item.img} />
                }

            </div>
            <div className="text-center text-ellipsis text-nowrap overflow-hidden py-1 text-shadow-sm font-bold">{item.label}</div>
            {
                item.info2 &&
                <p className="text-sm text-center text-nowrap overflow-hidden text-ellipsis px-1">{item.info2}</p>
            }
        </Link>
    </div>
}