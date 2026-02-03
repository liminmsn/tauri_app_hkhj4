import { Link } from "react-router-dom";

export default function (prop: { label: string; url: string }) {
    return <Link to={prop.url}
        className="
                            hover:shadow-none
                            active:shadow-md
                            p-1
                            theme_0
                            shadow-sm 
                            rounded-br-sm 
                            cursor-pointer">
        <span className="text-sm">{prop.label}</span>
    </Link>
}