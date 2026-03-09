import NetUser, { NetUserAPI } from "@/api/NetUser";
/**获取登录验证图片 */
export async function user_api_captcha(email: string) {
    const form = new FormData()
    form.append("email", email);
    return await new NetUser(NetUserAPI.captcha_image).get(form).then<any>(true);
}


/**用户登录 */
export async function user_api_login(from: FormData) {
    const res = await new NetUser(NetUserAPI.login).post(from).then<any>();
    return res;
}

/**注册用户 */
export async function user_api_userRegister(from: FormData) {
    const res = await new NetUser(NetUserAPI.register).post(from).then<any>(true);
    return res;
}
/**修改密码 */
export async function user_api_userForgotpwd(from: FormData) {
    const res = await new NetUser(NetUserAPI.forgot_pwd).post(from).then<any>(true);
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
    const res = await new NetUser(NetUserAPI.user_info).get().then<UserInfoType>();
    return res;
}
export type PremiumListItem = {
    id: number;
    price: string;
    priceDiscount: string;
    priceLabel: string;
    priceDescription: string;
    day: string;
}
/**获取订阅列表信息 */
export async function user_api_premium_list() {
    const res = await new NetUser(NetUserAPI.premium_list).get().then<PremiumListItem[]>();
    return res;
}