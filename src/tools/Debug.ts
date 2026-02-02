export default class {
    Log(key: string, ...args: any[]) {
        console.log("%cDEBUG:", "color:red;background:yellowgreen;padding:4px;", key, ...args);
    }
}