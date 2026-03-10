import { Link } from "react-router-dom";

export default function (prop: { label: string; url: string, disabled?: boolean }) {
    return <Link to={prop.url}
        className={`
            w-full
            ${prop.disabled ? 'opacity-40 pointer-events-none' : 'shadow-sm'}
            flex
            justify-between
            overflow-hidden
            hover:shadow-none
            active:scale-95
            rounded-r-sm
            rounded-bl-sm
            theme_0
            cursor-pointer
        `}>
        <div className="text-sm p-1 w-full">
            {prop.label}
        </div>
        <div className="w-1 min-w-1 h-full theme_1"></div>
    </Link>
}