import { categoryHomePath } from "@/hooks/CateGoryProvider";

export default function () {
    return <div className="text-center pt-10 shouxie">
        <p className="text-xl font-bold">
            路由出错啦！
        </p>
        <p>这不是你的问题!</p>
        <form action={categoryHomePath()}>
            <input className="p-0! py-1! px-2! shadow-sm" type="submit" value="修复它" />
        </form>
    </div>
}