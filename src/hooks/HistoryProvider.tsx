import { createContext, ReactNode, useContext, useState } from "react";
export type HistoryContextTypeItem = {
    grep: number;
    select: number;
    url: string;
    img: string;
    label: string;
}
type HistoryContextType = {
    history: HistoryContextTypeItem;
    add: (item: Partial<HistoryContextTypeItem>) => void;
}

const history_hook: HistoryContextTypeItem = {
    grep: 0,
    select: 0,
    url: "",
    img: "",
    label: ""
}

const HistoryContext = createContext<HistoryContextType | null>(null);
export default function ({ children }: { children: ReactNode }) {
    const [history, setHistory] = useState<HistoryContextTypeItem>(history_hook);
    const add = function (item: Partial<HistoryContextTypeItem>) {
        setHistory(prev => {
            const next = { ...prev, ...item };
            console.log('history_hook', next);
            return next;
        });
    }

    return <HistoryContext.Provider value={{ history, add }}>
        {children}
    </HistoryContext.Provider>
}

export function useHistoryContext() {
    const context = useContext(HistoryContext);

    if (!context) {
        throw new Error("useHistoryContext must be used within ThemeProvider");
    }

    return context;
}