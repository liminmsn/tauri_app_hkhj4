export default function () {
    return <div className="px-10 py-4 pb-8">
        <form className="flex flex-col gap-1.5">
            <p className="text-xl mb-2">注册用户</p>
            <input className="border outline-none" type="email" name="email" placeholder="邮箱" />
            <input className="border outline-none" type="password" name="password" placeholder="密码" />
            <input className="border outline-none" type="text" name="username" placeholder="用户名" />
            <select className="border outline-none" name="gender">
                <option value={1} label="男生" />
                <option value={2} label="女生" />
                {/* <option value={0} label="私密" /> */}
            </select>
            <input className="theme_0 text_0 font-bold" type="submit" value="注册" />
        </form>
    </div>
}