import { Link } from "react-router-dom";

export default function (prop: { label: string; url: string }) {
    return <Link to={prop.url}
        className="
            flex
            justify-between
            overflow-hidden
            hover:shadow-none
            active:scale-95
            rounded-r-sm
            rounded-bl-sm
            theme_0
            shadow-sm
            cursor-pointer">
        <div className="text-sm p-1">
            {prop.label}
        </div>
        <div className="w-1 min-w-1 h-full theme_1"></div>
    </Link>
}