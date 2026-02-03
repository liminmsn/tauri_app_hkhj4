import Debug from "@/tools/Debug";
import GlobalEvent from "@/tools/GlobalEvent";
import { ClientOptions, fetch } from "@tauri-apps/plugin-http";

export enum NetAPI {
    Home = "/"
}

export default class Net extends Debug {
    base_url = import.meta.env['VITE_URL'] as string;
    private fetchInit: RequestInit & ClientOptions = {}

    constructor(url = "") {
        super();
        this.base_url += url;
    }
    get(form?: FormData) {
        this.fetchInit.method = "GET";
        this.fetchInit.body = form;
        return this.send();
    }
    pose(body: object) {
        this.fetchInit.method = "POST";
        this.fetchInit.body = JSON.stringify(body);
        return this.send();
    }
    private async send() {
        this.Log("网络请求:", this.base_url);
        GlobalEvent.send('loding', true);
        const res = await fetch(this.base_url, this.fetchInit);
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        GlobalEvent.send('loding', false);
        return res;
    }
}