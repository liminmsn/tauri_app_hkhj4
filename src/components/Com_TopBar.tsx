import { Icon } from "@iconify/react";
import logo from "@/assets/icon/icon.svg";
import { useNavigation } from "react-router-dom";
import { window } from "@tauri-apps/api";
import { useEffect, useState } from "react";
const app_name = import.meta.env['VITE_APPNAME'] as string;

const win = window.getCurrentWindow();
export default function () {
    const navigate = useNavigation();
    const [isfull, setIsFull] = useState(false);

    useEffect(() => {
        win.isMaximized().then(setIsFull)
    }, [])
    return <div className="theme_0 px-2 py-1 flex justify-between shadow-sm drag">
        <div className="flex no_drag">
            <div className=" inline-flex">
                <img src={logo} />
                <span className=" ml-2 font-bold">{app_name}</span>
            </div>
            <div className=" ml-2">
                {JSON.stringify(navigate.location)}
            </div>
        </div>
        <div className="inline-flex select-none no_drag">
            <Icon onClick={async () => await win.minimize()} icon="line-md:minus-square-twotone" width="24" className="cursor-pointer active:scale-95" />
            <Icon onClick={async () => { await win.toggleMaximize(), setIsFull(!isfull) }} icon={isfull ? 'line-md:downloading-loop' : 'line-md:uploading-loop'} width="24" className="cursor-pointer active:scale-95" />
            <Icon onClick={async () => await win.close()} icon="line-md:close-circle-twotone" width="24" className="cursor-pointer active:scale-95 text-red-500" />
        </div>
    </div>
}