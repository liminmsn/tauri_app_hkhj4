import Com_captcha from "@/components/com_captcha";
import { user_api_userRegister } from "@/router/user_api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function () {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [disabled, setDisabled] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const pwd = formData.get('password');
        const pwd_enter = formData.get('password_enter');
        if (pwd != pwd_enter) {
            toast("输入的两次密码不一致", { theme: "dark" });
            return;
        }

        formData.delete("password_enter");
        setDisabled(true);
        user_api_userRegister(formData).then(res => {
            setDisabled(false);
            if (res.code == 200) {
                navigate("/user");
            }
        });
    }

    return <div className="px-10 py-4 pb-8">
        <form className="flex flex-col gap-1.5 text-left" onSubmit={handleSubmit}>
            <p className="text-xl font-bold mb-2">注册用户</p>
            <label>昵&nbsp;&nbsp;称：
                <input className="border outline-none" type="text" name="username" placeholder="不吃香菜" required />
            </label>
            <label>邮&nbsp;&nbsp;箱：
                <input className="border outline-none" type="email" name="email" placeholder="hkhj4@qq.com" required onInput={(e) => setEmail((e.target as any)['value'])} />
            </label>
            <label>密&nbsp;&nbsp;码：
                <input className="border outline-none" type="password" name="password" placeholder="******" required />
            </label>
            <label>验&nbsp;&nbsp;证：
                <input className="border outline-none" type="password" name="password_enter" placeholder="再次输入密码" required />
            </label>
            {
                email &&
                <Com_captcha time={60} email={email} />
            }
            <label>性&nbsp;&nbsp;别：
                <select className="border outline-none" name="gender" defaultValue={0}>
                    <option value={0} label="私密" />
                    <option value={1} label="男生" />
                    <option value={2} label="女生" />
                </select>
            </label>
            <input disabled={disabled} type="submit" value="注册" />
            <div className="text-sm text-right">
                <Link to={"/user"}>已有帐号? 去登录</Link>
            </div>
        </form>
    </div>
}