import { animate, spring } from 'animejs';
import { ReactNode, useEffect, useRef } from 'react';
export default function ({ children }: { children: ReactNode }) {
    const p_ = useRef(null);
    useEffect(() => {
        animate(p_.current as any, {
            opacity: [
                { to: .25, ease: 'inOut(2)', duration: 200 },
                { to: 1, ease: spring({ bounce: .7 }) }
            ],
            loop: true,
            loopDelay: 250,
        })
    }, [])
    return <p ref={p_}>
        {children}
    </p>
}