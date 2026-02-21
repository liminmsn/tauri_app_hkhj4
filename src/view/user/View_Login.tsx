import GlobalEvent from "@/tools/GlobalEvent";
import { Link } from "react-router-dom";

export default function () {

    function search(formData: FormData) {
        GlobalEvent.send('toast', { label: formData.get('username'), icon: '✅' })
    }

    return <div className="w-full text-center">
        <form className="flex flex-col gap-1.5 py-4 px-8" action={search}>
            <p className="text-xl mb-2">{import.meta.env['VITE_APPNAME']}</p>
            <input className="border outline-none" type="email" name="username" placeholder="邮箱" />
            <input className="border outline-none" type="password" name="password" placeholder="密码" />
            <input className="theme_0 text_0 font-bold" type="submit" value="登录" />
            <div className="flex justify-between text-sm">
                <Link to={""}>忘记密码？</Link>
                <Link to={"register"}>注册</Link>
            </div>
        </form>
    </div>
}