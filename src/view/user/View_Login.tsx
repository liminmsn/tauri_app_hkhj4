import { user_api_login } from "@/router/user_api";
import { Link, useLoaderData} from "react-router-dom";
import { toast } from "react-toastify";

export default function () {
    const { data } = useLoaderData();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        user_api_login(formData).then(res => {
            toast(res.msg, {
                type: res.code == 200 ? "success" : "warning",
                theme: "dark",
                delay: 10,
            });
            if (res.code == 200) {
                localStorage.setItem('token', res.data);
                window.location.pathname = '/user/userInfo';
            }
        });
    }

    return <form className="flex flex-col gap-1.5 px-10 py-4 pb-8" onSubmit={handleSubmit}>
        <p className="text-xl font-bold mb-2">{import.meta.env['VITE_APPNAME']}</p>
        <label>邮箱：
            <input className="border outline-none" type="email" name="email" placeholder="12345@qq.com" required />
        </label>
        <label>密码：
            <input className="border outline-none" type="password" name="password" placeholder="******" required minLength={6} />
        </label>
        <label>
            <div className="flex">
                <div className="w-12 theme_0 text-sm text-center leading-7 font-bold">{data}</div>
                <input className="border outline-none" type="text" name="captcha" placeholder="输入验证码" required />
            </div>
        </label>
        <input className="theme_0 text_0" type="submit" value="登录" />
        <div className="flex justify-between text-sm">
            <Link to={""}>忘记密码？</Link>
            <Link to={"register"}>注册</Link>
        </div>
    </form>
}