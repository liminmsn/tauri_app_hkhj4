import { useSearchParams } from "react-router-dom"

export default function () {
    const [searchParams] = useSearchParams();
    const s = searchParams.get('s');

    if (s == null) {
        return <div className="p-1 h-1/2 flex justify-center items-center">
            <div className="text-center">
                <img className="w-20 mx-auto" src="/logo.png" />
                <h1 className="mt-2 font-bold text-xl">{import.meta.env["VITE_APPNAME"]}</h1>
                <h2 className="opacity-45">海量 韩剧 电影 综艺 等你来发现</h2>
            </div>
        </div>
    }

    return <div className="p-2">
        {JSON.stringify(searchParams.get('s'))}
        搜索页
    </div>
}