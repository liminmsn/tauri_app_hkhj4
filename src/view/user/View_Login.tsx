import { Link } from "react-router-dom";

export default function () {
    return <div className="w-full text-center">
        <div className="inline-block theme_0 mt-10 p-10 rounded-md shadow-sm">
            <form className="flex flex-col gap-1.5">
                <input className="border outline-none" type="text" name="username" placeholder="邮箱" />
                <input className="border outline-none" type="password" name="password" placeholder="密码" />
                <input className="border outline-none" type="submit" value="登录" />
                <div className="flex justify-between text-sm">
                    <Link to={""}>忘记密码？</Link>
                    <Link to={"register"}>注册</Link>
                </div>
            </form>
        </div>
    </div>
}