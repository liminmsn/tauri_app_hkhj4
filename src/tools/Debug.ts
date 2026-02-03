export default class {
    Log(key: string, ...args: any[]) {
        console.log("%cDEBUG:", "color:white;background:yellowgreen;padding:2px 4px;border-radius:4px;", key, ...args);
    }
}