import NetUser, { NetUserAPI } from "@/api/NetUser";
/**获取登录验证图片 */
export async function user_api_captcha_image() {
    return await new NetUser(NetUserAPI.captcha_image).get().then();
}