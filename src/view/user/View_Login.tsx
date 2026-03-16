import { categoryHomePath } from "@/hooks/CateGoryProvider";
import { useMemberContext } from "@/hooks/MemberProvider";
import { user_api_login } from "@/router/user_api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function () {
    const { updateState } = useMemberContext();
    const navigate = useNavigate();  // 👈 加这个
    const [disabled, setDisabled] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setDisabled(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        user_api_login(formData).then(res => {
            setDisabled(false);
            if (res.code == 200) {
                localStorage.setItem('token', res.data);
                updateState(() => {
                    navigate(categoryHomePath());
                });
            }
        });
    }

    return <form className="flex flex-col gap-1.5 px-10 py-4 pb-8" onSubmit={handleSubmit}>
        <p className="text-xl font-bold mb-2">登录</p>
        <label>邮&nbsp;&nbsp;&nbsp;箱：
            <input className="border outline-none" type="email" name="email" placeholder="hkhj4@qq.com" required />
        </label>
        <label>密&nbsp;&nbsp;&nbsp;码：
            <input className="border outline-none" type="password" name="password" placeholder="******" required />
        </label>
        {/* <Com_captcha /> */}
        <input disabled={disabled} type="submit" value="登录" />
        <div className="flex justify-between text-sm">
            <Link to={"forgot_password"}>修改密码？</Link>
            <Link to={"register"}>注册</Link>
        </div>
    </form>
}