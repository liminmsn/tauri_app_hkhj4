import { Icon } from "@iconify/react";
import logo from "@/assets/icon/icon.svg";
import { useNavigate, useNavigation, useRoutes } from "react-router-dom";
import { window } from "@tauri-apps/api";
import { useEffect, useState } from "react";
const app_name = import.meta.env['VITE_APPNAME'] as string;

const win = window.getCurrentWindow();
export default function () {
    // const navigate = useNavigation();
    const navigate = useNavigate();
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
            <div className="inline-flex ml-2">
                <Icon onClick={() => navigate(-1)} icon="line-md:arrow-left-circle-twotone" width="24" className="cursor-pointer active:scale-95" />
                <Icon onClick={() => navigate("/")} icon="line-md:home-twotone" width="24" className="cursor-pointer active:scale-95" />
                <Icon onClick={() => location.reload()} icon="line-md:gauge-full-twotone" width="24" className="cursor-pointer active:scale-95" />
            </div>
        </div>
        <div className="flex select-none no_drag">
            <div className="inline-flex">
                <Icon onClick={async () => await win.minimize()} icon="line-md:minus-square-twotone" width="24" className="cursor-pointer active:scale-95" />
                <Icon onClick={async () => { await win.toggleMaximize(), setIsFull(!isfull) }} icon={isfull ? 'line-md:downloading-loop' : 'line-md:uploading-loop'} width="24" className="cursor-pointer active:scale-95" />
                <Icon onClick={async () => await win.close()} icon="line-md:close-circle-twotone" width="24" className="cursor-pointer active:scale-95 text-red-500" />
            </div>
        </div>
    </div>
}