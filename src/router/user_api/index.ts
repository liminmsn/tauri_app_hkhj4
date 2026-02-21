import NetUser, { NetUserAPI } from "@/api/NetUser";
/**获取登录验证图片 */
export async function user_api_captcha_image() {
    const net_user = new NetUser(NetUserAPI.captcha_image);
    return net_user.getData(await net_user.get())
}