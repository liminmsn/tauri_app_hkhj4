import { Link } from "react-router-dom";

export default function (prop: { label: string; url: string }) {
    return <Link to={prop.url}
        className="
            flex
            hover:shadow-none
            active:shadow-md
            theme_0
            shadow-sm 
            rounded-r-sm 
            cursor-pointer">
        <div className="w-1 h-full theme_1"></div>
        <div className="text-sm p-1">{prop.label}</div>
    </Link>
}