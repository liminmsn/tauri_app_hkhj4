import { useHistoryContext } from "@/hooks/HistoryProvider";
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
                    theme_0
                    group
                    hover:rounded-md
                    active:scale-90
                    shadow-sm 
                    overflow-hidden 
                    cursor-pointer
                    relative
                    flex flex-col z-10">
        <Link to={`/detail/${window.btoa(item.url)}`}>
            {/* {item.url} */}
            {/* <div className="theme_1 h-1" style={{ backgroundSize: "100% auto", backgroundImage: 'url("/test/bg.svg")' }}></div> */}
            <div className="h-50 overflow-hidden relative flex justify-center items-center">
                <span className="absolute z-2 top-0 left-0 text-sm bg-black/50 px-1 rounded-br-sm group-hover:hidden">{item.info}</span>
                {
                    isErr ?
                        <div>
                            <Icon icon="line-md:youtube-twotone" width="40" />
                        </div> :
                        <img className="
                        min-w-full
                        absolute 
                        transition"
                            onError={() => setIsErr(true)}
                            src={item.img} />
                }

            </div>
            <div className="overflow-hidden text-ellipsis absolute w-full bottom-0">
                <p className="p-1 group-hover:hidden block text-sm text-nowrap bg-black/80">{item.label}</p>
                {
                    item.info2 &&
                    <p className="group-hover:block hidden text-sm text-nowrap overflow-hidden text-ellipsis p-1 bg-black/80">{item.info2}</p>
                }
            </div>
        </Link>
    </div>
}