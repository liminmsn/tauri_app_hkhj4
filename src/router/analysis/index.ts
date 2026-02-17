import Debug from "@/tools/Debug";

export default class {
    static init<T>(htmlText: string, analysis_fun: (dom: Document) => T) {
        const dom = new DOMParser().parseFromString(htmlText, 'text/html');
        if (import.meta.env['VITE_ANALYSIS_DEBUG'] == "true") {
            new Debug().Log('解析类数据:', htmlText, dom);
        }
        return analysis_fun(dom);
    }
}