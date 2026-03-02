import NetUser, { NetUserAPI } from "@/api/NetUser";
/**获取登录验证图片 */
export async function user_api_captcha(email: string) {
    const form = new FormData()
    form.append("email", email);
    return await new NetUser(NetUserAPI.captcha_image).get(form).then();
}


/**用户登录 */
export async function user_api_login(from: FormData) {
    const res = await new NetUser(NetUserAPI.login).post(from).then();
    return res;
}

/**注册用户 */
export async function user_api_userRegister(from: FormData) {
    const res = await new NetUser(NetUserAPI.register).post(from).then();
    return res;
}
export type UserInfoType = {
    username: string;
    email: string;
    image: string;
    gender: number;
    registerTime: string;
}
/**获取用户信息 */
export async function user_api_userInfo() {
    return await new NetUser(NetUserAPI.user_info).get().then();
}