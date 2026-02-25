import { Link } from "react-router-dom";

export default function () {
    return <div className="px-10 py-4 pb-8">
        <form className="flex flex-col gap-1.5 text-left">
            <p className="text-xl font-bold mb-2">注册用户</p>
            <label>昵&nbsp;&nbsp;称：
                <input className="border outline-none" type="text" name="username" placeholder="不吃香菜" required />
            </label>
            <label>邮&nbsp;&nbsp;箱：
                <input className="border outline-none" type="email" name="email" placeholder="hkhj4@qq.com" required />
            </label>
            <label>密&nbsp;&nbsp;码：
                <input className="border outline-none" type="password" name="password" placeholder="******" minLength={6} required />
            </label>
            <label htmlFor="">性&nbsp;&nbsp;别：
                <select className="border outline-none" name="gender" defaultValue={0}>
                    <option value={0} label="私密" />
                    <option value={1} label="男生" />
                    <option value={2} label="女生" />
                </select>
            </label>
            <input className="theme_0 text_0" type="submit" value="注册" required />
            <div className="text-sm text-right">
                <Link to={"/user"}>已有帐号? 去登录</Link>
            </div>
        </form>
    </div>
}