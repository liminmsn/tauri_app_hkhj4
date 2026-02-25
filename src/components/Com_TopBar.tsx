import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { app, window } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import GlobalEvent from "@/tools/GlobalEvent";
import Anim_label from "./anim/anim_label";
const app_name = import.meta.env['VITE_APPNAME'] as string;

const win = window.getCurrentWindow();
export default function () {
    const navigate = useNavigate();
    const [loding, setLoding] = useState(false);
    const [isfull, setIsFull] = useState(false);

    useEffect(() => {
        win.isMaximized().then(setIsFull);
        GlobalEvent.on('loding', setLoding)
    }, [])
    return <div className="theme_0 px-2 py-1 flex justify-between shadow-sm drag">
        <div className="flex no_drag">
            <div className=" inline-flex">
                <Anim_label>{app_name}</Anim_label>
            </div>
            <div className="inline-flex gap-1 ml-2">
                <Icon onClick={() => navigate("/")} icon="line-md:home-md-twotone" width="24" className="cursor-pointer active:scale-95" />
                <Icon onClick={() => navigate(-1)} icon="line-md:arrow-left-circle-twotone" width="24" className="cursor-pointer active:scale-95" />
                <Icon onClick={() => location.reload()} icon="line-md:round-360" width="24" className="cursor-pointer active:scale-95" />
                <div>
                    {loding && <Icon icon="line-md:beer-alt-twotone-loop" width="24" />}
                </div>
            </div>
        </div>
        <div className="flex select-none no_drag">
            <div className="inline-flex gap-1 mr-2">
                <Link to={"/user"}> <Icon icon="material-symbols:account-circle" width="24" className="cursor-pointer active:scale-95" /></Link>
                <Link to={"/setting"}> <Icon icon="line-md:cog-loop" width="24" className="cursor-pointer active:scale-95" /></Link>
            </div>
            <div className="inline-flex">
                <Icon onClick={async () => await win.minimize()} icon="line-md:minus-square-twotone" width="24" className="cursor-pointer active:scale-95" />
                <Icon onClick={async () => { await win.toggleMaximize(), setIsFull(!isfull) }} icon={isfull ? 'line-md:downloading-loop' : 'line-md:uploading-loop'} width="24" className="cursor-pointer active:scale-95" />
                <Icon onClick={async () => await win.close()} icon="line-md:close-circle-twotone" width="24" className="cursor-pointer active:scale-95 text-red-500" />
            </div>
        </div>
    </div>
}