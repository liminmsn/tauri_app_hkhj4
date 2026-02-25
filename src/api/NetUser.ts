import Debug from "@/tools/Debug";
import GlobalEvent from "@/tools/GlobalEvent";
import { toast } from "react-toastify";

export enum NetUserAPI {
    /**获取登录图片验证码 */
    captcha_image = "/captcha",
    /**用户登录 */
    login = "/login",
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
    async then(): Promise<{ code: number, msg: string, data: any }> {
        this.nethook.loding();
        const res = await fetch(this.baseUrl, this.initData);
        this.nethook.lodingEnd();
        try {
            return await res.json();
        } catch (error) {
            toast("服务器错误!", {
                position: 'bottom-right',
                type: 'error',
                theme: 'dark'
            })
            return {
                code: 500,
                msg: "错误",
                data: null
            }
        }
    }
}