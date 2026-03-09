import Debug from "@/tools/Debug";
import GlobalEvent from "@/tools/GlobalEvent";
import { ClientOptions, fetch } from "@tauri-apps/plugin-http";

export enum NetAPI_Plot {
    Home = "/",
    Rank = "/label/rank.html"
}
export enum NetAPI_Move {
    Home = "/dianying.html",
}

export default class Net extends Debug {
    base_url = import.meta.env['VITE_URL'] as string;

    private fetchInit: RequestInit & ClientOptions = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests': '1'
        }
    }
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