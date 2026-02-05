export default class {
    static init<T>(htmlText: string, analysis_fun: (dom: Document) => T) {
        console.log(htmlText);
        
        const dom = new DOMParser().parseFromString(htmlText, 'text/html');
        return analysis_fun(dom);
    }
}