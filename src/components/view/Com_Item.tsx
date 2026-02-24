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
                    hover:shadow-none
                    active:scale-98
                    shadow-sm 
                    overflow-hidden 
                    cursor-pointer flex flex-col z-10">
        <Link to={`/detail/${window.btoa(item.url)}`}>
            {/* {item.url} */}
            <div className="theme_0 h-1" style={{ backgroundSize: "100% auto", backgroundImage: 'url("/test/bg.svg")' }}></div>
            <div className="h-50 label_bg overflow-hidden relative flex justify-center items-center">
                <span className="absolute z-2 top-0 left-0 text-sm bg-black/50 px-1 rounded-br-sm group-hover:hidden">{item.info}</span>
                {
                    isErr ?
                        <div>
                            <Icon icon="line-md:youtube-twotone" width="40" />
                        </div> :
                        <img className="
                        min-w-full
                        group-hover:-z-1
                        absolute 
                        transition"
                            onError={() => setIsErr(true)}
                            src={item.img} />
                }

            </div>
            <div className="text-center overflow-hidden text-ellipsis theme_0">
                <span className="text-sm text-nowrap">{item.label}</span>
            </div>
            {
                item.info2 &&
                <div className="text-center label_bg overflow-hidden text-ellipsis px-1">
                    <span className="text-sm text-nowrap scale-10">{item.info2}</span>
                </div>
            }
        </Link>
    </div>
}