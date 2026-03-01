import { Link } from "react-router-dom";

export default function (prop: { label: string; url: string }) {
    return <Link to={prop.url}
        className="
            flex
            justify-between
            hover:shadow-none
            overflow-hidden
            active:shadow-md
            theme_0
            shadow-sm 
            rounded-r-sm 
            rounded-bl-sm
            cursor-pointer">
        <div className="text-sm p-1">
            {prop.label}
        </div>
        <div className="w-1 min-w-1 h-full theme_1"></div>
    </Link>
}