export default function () {
    return <div className="w-full text-center">
        <div className="inline-block theme_0 mt-10 p-10 rounded-md shadow-sm">
            <form className="flex flex-col gap-1.5">
                <input className="border outline-none" type="text" name="email" placeholder="邮箱" />
                <input className="border outline-none" type="password" name="password" placeholder="密码" />
                <input className="border outline-none" type="text" name="username" placeholder="用户名" />
                <select className="border outline-none" name="gender">
                    <option value={1} label="男生" />
                    <option value={2} label="女生" />
                    {/* <option value={0} label="私密" /> */}
                </select>
                <input className="border outline-none" type="submit" value="注册" />
            </form>
        </div>
    </div>
}