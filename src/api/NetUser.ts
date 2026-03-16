import Debug from "@/tools/Debug";
import GlobalEvent from "@/tools/GlobalEvent";
import { toast } from "react-toastify";

export enum NetUserAPI {
    /**获取登录图片验证码 */
    captcha_image = "/captcha",
    /**用户登录 */
    login = "/login",
    /**注册用户 */
    register = "/createUser",
    /**修改密码 */
    forgot_pwd = "/changePassword",
    /**用户信息 */
    user_info = "/api/user/info",
    /**价格列表 */
    premium_list = "/api/premium/premium_list",
    /**支付二维码 */
    premium_pay = "/api/premium/spay",
    /**订阅时长 */
    premium_member = "/api/premium/get_member"
}

export default class NetUser extends Debug {
    baseUrl = "/api"
    private initData: RequestInit & { headers: any } = {
        headers: {
            token: ""
        }
    };
    constructor(url: NetUserAPI | string = "", private redirect = true) {
        super();
        this.baseUrl += url;
        const token = localStorage.getItem("token");
        if (token) {
            this.initData.headers["token"] = token;
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
    async then<T>(suc_toast = false) {
        this.nethook.loding();
        try {
            const res = await (await fetch(this.baseUrl, this.initData)).json() as { code: number, msg: string, data: T };
            this.nethook.lodingEnd();
            //token失效
            if (res.code == -1 && this.redirect) {
                localStorage.removeItem('token');
                window.location.pathname = '/user';
            }
            if (suc_toast) {
                toast(res.msg, { theme: "dark", type: res.code == 200 ? "success" : "warning" });
            }
            return res;
        } catch (error) {
            toast("服务器连接错误", { theme: "dark", type: "error" });
            return {
                code: 500,
                msg: "",
                data: null
            }
        }
    }
}