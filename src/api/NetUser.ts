import { toast, TypeOptions } from "react-toastify";
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
    constructor(url = "") {
        super(url);
    }
    nethook = {
        notific_id: 0,
        notific: (label: string, type: TypeOptions = "default", loding: boolean = false) => {
            this.nethook.notific_id = toast(label, {
                theme: 'dark',
                type: type,
                isLoading: loding
            }) as number;
        },
        loding: () => {
            this.nethook.notific("加载中");
        },
        lodingEnd: () => {
            toast.dismiss(this.nethook.notific_id);
        }
    };
    async getData(res: Response): Promise<{ code: number, msg: string, data?: any }> {
        if (res.status == 200) {
            return await res.json() as any;
        }
        return {
            code: 500,
            msg: '服务器错误'
        }
    }
}