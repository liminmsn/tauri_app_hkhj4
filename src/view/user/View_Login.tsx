import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

export default function () {
    const { data } = useLoaderData();
    function search(formData: FormData) {
        toast.promise(() => {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res(213);
                }, 1000);
            })
        }, { pending: '加载中', success: 'suc', error: 'er' })
    }

    return <div className="w-full text-center">
        <form className="flex flex-col gap-1.5 py-4 px-8" action={search}>
            <p className="text-xl mb-2 font-bold">{import.meta.env['VITE_APPNAME']}</p>
            <input className="border outline-none" type="email" name="username" placeholder="邮箱" />
            <input className="border outline-none" type="password" name="password" placeholder="密码" />
            <div className="flex">
                <input className="border outline-none" type="text" name="captcha" placeholder="输入图片验证码" />
                <img className="inline-block max-h-7" srcSet={data} />
            </div>
            <input className="theme_0 text_0 font-bold" type="submit" value="登录" />
            <div className="flex justify-between text-sm">
                <Link to={""}>忘记密码？</Link>
                <Link to={"register"}>注册</Link>
            </div>
        </form>
    </div>
}