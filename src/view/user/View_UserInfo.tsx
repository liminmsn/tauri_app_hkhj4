import icon from '@/assets/react.svg';
import { UserInfoType } from '@/router/user_api';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
export default function () {
    const { data } = useLoaderData<{ data: UserInfoType }>();
    const [disabled, setDisabled] = useState(true);

    function exit_login() {
        localStorage.removeItem('token');
        window.location.pathname = '/';
    }

    return <form className="flex flex-col gap-1.5 px-20 py-4 pb-8">
        <div>
            <img className='h-20 w-20 border rounded-md' style={{ borderColor: 'var(--theme_0)' }} src={icon} alt="头像" />
        </div>
        <input className="border outline-none" disabled={disabled} value={data.email} type="email" name="email" required />
        <input className="border outline-none" disabled={disabled} value={data.username} type="text" name="password" required minLength={6} />
        <select className="border outline-none" disabled={disabled} name="gender" defaultValue={data.gender}>
            <option value={0} label="私密" />
            <option value={1} label="男生" />
            <option value={2} label="女生" />
        </select>
        <input className="theme_0 text_0" type="button" onClick={() => setDisabled(!disabled)} value={disabled ? "编辑" : "保存"} />
        <input className="theme_0 text_0" type="button" value="退出登录" onClick={() => exit_login()} />
    </form>
}