export default class {
    static ents = new EventTarget();
    static on(key: string, callfun: (e: any) => void) {
        this.ents.addEventListener(key, (e: any) => callfun(e.detail));
    }
    static send(key: string, val: any) {
        this.ents.dispatchEvent(new CustomEvent(key, {
            detail: val
        }))
    }
}