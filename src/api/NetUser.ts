import Net from "./Net";

export enum NetUserAPI {
    /**获取登录图片验证码 */
    captcha_image = "/captcha/image",
    /**用户登录 */
    login = "/login",
    /**价格列表 */
    premium_list = "/api/premium/premium_list",
    /**注册用户 */
    register = "/api/user/createUser"
}

export default class NetUser extends Net {
    base_url = import.meta.env['Vite_URL_USER'];
    constructor() {
        super();
    }
}