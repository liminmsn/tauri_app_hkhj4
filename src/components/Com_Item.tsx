import errImg from "@/assets/icon/icon.svg"
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
    return <div key={item.url} className="
                    group 
                    hover:shadow-none
                    active:scale-98
                    shadow-sm 
                    overflow-hidden 
                    cursor-pointer flex flex-col z-10">
        <div className="theme_0 h-1" style={{ backgroundSize: "100% auto", backgroundImage: 'url("/test/bg.svg")' }}></div>
        <div className="h-50 label_bg overflow-hidden relative flex justify-center items-center">
            <span style={{ color: 'var(--theme_0)' }} className="absolute z-2 top-0 left-0 text-sm bg-black/50 px-1 rounded-br-sm group-hover:hidden">{item.info}</span>
            <img className="
                            group-hover:-z-1 
                            group-hover:rotate-0
                            group-hover:scale-100
                            group-hover:translate-0
                            scale-100
                            absolute 
                            transition" onError={
                    (e) => {
                        (e.currentTarget as HTMLImageElement).src = errImg;
                    }
                } src={item.img} />
        </div>
        <div className="text-center overflow-hidden text-ellipsis" style={{ backgroundSize: "100% auto", backgroundImage: 'url("/test/bg.svg")' }}>
            <span className="text-sm text-nowrap">{item.label}</span>
        </div>
        {
            item.info2 &&
            <div className="text-center label_bg overflow-hidden text-ellipsis">
                <span className="text-sm text-nowrap scale-10">{item.info2}</span>
            </div>
        }
    </div>
}