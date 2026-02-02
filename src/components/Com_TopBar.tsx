import { Icon } from "@iconify/react";
import logo from "@/assets/icon/icon.svg";
const app_name = import.meta.env['VITE_APPNAME'] as string;
export default function () {
    return <div className="theme_0 px-2 py-1 flex justify-between shadow-sm">
        <div className="flex">
            <div className=" inline-flex">
                <img src={logo} />
                <span className=" ml-2 font-bold">{app_name}</span>
            </div>
            <div className=" ml-2">

            </div>
        </div>
        <div className="inline-flex select-none">
            <Icon icon="line-md:minus-square-twotone" width="24" className="cursor-pointer active:scale-95" />
            <Icon icon="line-md:uploading-loop" width="24" className="cursor-pointer active:scale-95" />
            <Icon icon="line-md:close-circle-twotone" width="24" className="cursor-pointer active:scale-95 text-red-500" />
        </div>
    </div>
}