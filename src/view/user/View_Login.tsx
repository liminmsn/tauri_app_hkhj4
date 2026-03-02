import { user_api_login } from "@/router/user_api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function () {
    const navigate = useNavigate();  // 👈 加这个

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
                navigate("/user/userInfo");   // 👈 用这个
            }
        });
    }

    return <form className="flex flex-col gap-1.5 px-10 py-4 pb-8" onSubmit={handleSubmit}>
        <p className="text-xl font-bold mb-2">{import.meta.env['VITE_APPNAME']}</p>
        <label>邮&nbsp;&nbsp;&nbsp;箱：
            <input className="border outline-none" type="email" name="email" placeholder="12345@qq.com" required />
        </label>
        <label>密&nbsp;&nbsp;&nbsp;码：
            <input className="border outline-none" type="password" name="password" placeholder="******" required />
        </label>
        {/* <Com_captcha /> */}
        <input type="submit" value="登录" />
        <div className="flex justify-between text-sm">
            <Link to={""}>忘记密码？</Link>
            <Link to={"register"}>注册</Link>
        </div>
    </form>
}