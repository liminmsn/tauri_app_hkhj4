import Com_Card from "@/components/view/com_card";
import { Outlet } from "react-router-dom";

export default function () {
    return <div className="h-full flex justify-center items-center pb-40">
        <Com_Card>
            <Outlet />
        </Com_Card>
    </div>
}