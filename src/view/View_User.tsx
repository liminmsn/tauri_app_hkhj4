import Com_Card from "@/components/view/Com_Card";
import { Outlet } from "react-router-dom";

export default function () {
    return <div className="p-2 text-center">
        <Com_Card>
            <Outlet />
        </Com_Card>
    </div>
}