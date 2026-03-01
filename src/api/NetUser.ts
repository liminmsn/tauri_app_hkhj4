import Debug from "@/tools/Debug";
import GlobalEvent from "@/tools/GlobalEvent";
import { toast } from "react-toastify";

export enum NetUserAPI {
    /**获取登录图片验证码 */
    captcha_image = "/captcha",
    /**用户登录 */
    login = "/login",
    /**用户登录 */
    user_info = "/api/user/info",
    /**价格列表 */
    premium_list = "/api/premium/premium_list",
    /**注册用户 */
    register = "/api/user/createUser"
}

export default class NetUser extends Debug {
    baseUrl = "/api"
    private initData: RequestInit = {};
    constructor(url = "") {
        super();
        this.baseUrl += url;
        const token = localStorage.getItem("token");
        if (token) {
            this.initData.headers = { "token": token } as HeadersInit;
        }
    }
    protected nethook = {
        loding: () => {
            GlobalEvent.send('loding', true);
        },
        lodingEnd: () => {
            setTimeout(() => {
                GlobalEvent.send('loding', false);
            }, 50);
        }
    }
    get(form?: FormData) {
        this.initData.method = "GET";
        if (form) {
            const params = new URLSearchParams(form as any).toString();
            this.baseUrl += "?" + params;
        }
        return this;
    }
    post(form?: FormData) {
        this.initData.method = "POST";
        this.initData.body = form;
        return this;
    }
    async then() {
        try {
            this.nethook.loding();
            const res = await (await fetch(this.baseUrl, this.initData)).json() as { code: number, msg: string, data: any };
            this.nethook.lodingEnd();
            //token失效
            if (res.code == -1) {
                localStorage.removeItem('token');
                window.location.pathname = '/user';
            }
            return res;
        } catch (error) {
            return {
                code: 500,
                msg: "错误",
                data: null
            }
        }
    }
}