import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
    return <div className="inline-block rounded-md shadow-sm overflow-hidden theme_1_opacity">
        <div className="theme_0 h-2"></div>
        {children}
        <div className="theme_0 h-2"></div>
    </div>
}