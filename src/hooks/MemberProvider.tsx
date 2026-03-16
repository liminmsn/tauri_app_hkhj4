import { MemberType, user_api_get_member } from "@/router/user_api";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";



type MemberContextType = {
    member: MemberType | null,
    updateState: (call?: () => void) => void
};

const MemberContext = createContext<MemberContextType | null>(null);
export default function ({ children }: { children: ReactNode }) {
    const [member, setMember] = useState<MemberType | null>(null);
    function updateState(call?: () => void) {
        user_api_get_member().then((res) => {
            setMember(res);
            call && call();
        });
    }
    useEffect(() => {
        updateState();
    }, []);
    return <MemberContext.Provider value={{ member, updateState }}>
        {children}
    </MemberContext.Provider>
}

export function useMemberContext() {
    const context = useContext(MemberContext);
    if (!context) {
        throw new Error("useMemberContext must be used within ThemeProvider");
    }
    return context;
}