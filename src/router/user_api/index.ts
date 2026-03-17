import NetUser, { NetUserAPI } from "@/api/NetUser";
/**获取登录验证图片 */
export async function user_api_captcha(email: string) {
    const form = new FormData()
    form.append("email", email);
    return await new NetUser(NetUserAPI.captcha_image).get(form).then<any>(true);
}


/**用户登录 */
export async function user_api_login(from: FormData) {
    const res = await new NetUser(NetUserAPI.login).post(from).then<any>(true);
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

export type PremiumSpay = {
    name: string;
    money: string;
    premiumId: number;
    type: "alipay" | "wxpay"
}

export type PremiumSpayType = {
    code: number;
    msg: string;
    trade_no: string;
    O_id: string;
    payurl: string;
    payurl2: string;
    qrcode: string;
    img: string;
}
/**获取订阅列表信息 */
export async function user_api_premium_spay(params: PremiumSpay) {
    const from_data = new FormData();
    from_data.append("name", params.name);
    from_data.append("money", params.money);
    from_data.append("type", params.type);
    from_data.append("premium_id", String(params.premiumId));
    const res = await new NetUser(NetUserAPI.premium_pay).post(from_data).then<PremiumSpayType>(true);
    // res.data = JSON.parse(res.data || "");
    return res as any as Promise<{ code: number, data: PremiumSpayType, msg: string }>;
}

export type MemberType = {
    email: string;
    premiumType: number;
    expireTime: string;
    createTime: string;
    updateTime: string;
}
/**获取订阅时长 */
export async function user_api_get_member() {
    const res = await new NetUser(NetUserAPI.premium_member, false).get().then<MemberType>();
    return res.data;
}
/**创建用户反馈 */
export async function user_api_feed_back_submit(form: FormData) {
    const res = await new NetUser(NetUserAPI.feed_back_submit, true).get(form).then();
    return res;
}