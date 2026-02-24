import Debug from "@/tools/Debug";
import GlobalEvent from "@/tools/GlobalEvent";
import { ClientOptions, fetch } from "@tauri-apps/plugin-http";

export enum NetAPI {
    Home = "/"
}

export default class Net extends Debug {
    base_url = import.meta.env['VITE_URL'] as string;
    private fetchInit: RequestInit & ClientOptions = {}
    protected nethook = {
        loding: () => {
            GlobalEvent.send('loding', true);
        },
        lodingEnd: () => {
            setTimeout(() => {
                GlobalEvent.send('loding', false);
                GlobalEvent.send('top', false);
            }, 50);
        }
    }

    constructor(url = "", base_url?: string) {
        super();
        if (base_url) this.base_url = base_url;
        this.base_url += url;
    }
    get(form?: FormData) {
        this.fetchInit.method = "GET";
        this.fetchInit.body = form;
        return this.send();
    }
    post(body: object) {
        this.fetchInit.method = "POST";
        this.fetchInit.body = JSON.stringify(body);
        return this.send();
    }

    private async send() {
        this.nethook.loding();
        const res = await fetch(this.base_url, this.fetchInit);
        this.nethook.lodingEnd();
        // 调试方法
        if (import.meta.env['VITE_NET_DEBUG'] == "true") {
            this.Log("网络请求:", this.base_url);
            if (import.meta.env['VITE_NET_DEBUG_info'] == "true") {
                this.Log("请求数据:", res)
            }
        }
        return res;
    }
}