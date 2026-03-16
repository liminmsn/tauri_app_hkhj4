import { useMemberContext } from "@/hooks/MemberProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

export default function () {
    const { member } = useMemberContext();

    if (member) {
        return <Link to={"/premium"} title="订阅到期时间">
            <div className="px-2 rounded-sm flex items-center gap-1 number">
                <Icon icon="ri:alarm-line" width="20" className="cursor-pointer active:scale-95" />
                <span>{member.expireTime.replace("T", " ")}</span>
            </div>
        </Link>
    }


    return <div>
        <Link to={"/premium"}> <Icon icon="ri:bit-coin-fill" width="24" className="cursor-pointer active:scale-95" /></Link>
    </div>
}