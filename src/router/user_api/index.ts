import NetUser, { NetUserAPI } from "@/api/NetUser";
/**获取登录验证图片 */
export async function user_api_captcha() {
    return await new NetUser(NetUserAPI.captcha_image).get().then();
}

/**用户登录 */
export async function user_api_login(from: FormData) {
    const res = await new NetUser(NetUserAPI.login).post(from).then();
    console.log(res);

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