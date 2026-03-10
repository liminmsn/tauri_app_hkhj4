import { createContext, ReactNode, useContext, useState } from "react"
type CateGoryContextValueType = typeof category_default;
type CateGoryContextType = {
    value: CateGoryContextValueType;
    update: (val: CateGoryContextValueType) => void;
}

const LOCAL_CATEGORY = 'category';
const CATEGORY_PLOT = '/plot';
const CATEGORY_MOVE = '/move';


const category_default = {
    home: CATEGORY_PLOT
}
const home = localStorage.getItem(LOCAL_CATEGORY);
if (home) {
    category_default.home = home;
}

const CateGoryContext = createContext<CateGoryContextType | null>(null);
export default function ({ children }: { children: ReactNode }) {
    const [value, setCateGory] = useState(category_default)
    function update(val: Partial<CateGoryContextValueType>) {
        localStorage.setItem(LOCAL_CATEGORY, val.home!);
        const newobl = { ...value, ...val };
        setCateGory(newobl);
    }
    return <CateGoryContext.Provider value={{ value, update }}>
        {children}
    </CateGoryContext.Provider >
}
//返回默认前首页途径
function categoryHomePath(): typeof CATEGORY_PLOT | typeof CATEGORY_MOVE {
    let path = localStorage.getItem(LOCAL_CATEGORY) as any;
    if (!path) path = category_default.home;
    return path;
}
function useCateGoryContext() {
    const context = useContext(CateGoryContext);
    if (!context) {
        throw new Error("CateGoryContext must be used within ThemeProvider");
    }
    return context;
}

export { useCateGoryContext, categoryHomePath, CATEGORY_MOVE, CATEGORY_PLOT }