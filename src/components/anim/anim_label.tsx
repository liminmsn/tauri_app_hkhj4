import { animate, createTimeline, spring, stagger, Timeline } from 'animejs';
import { useEffect, useRef } from 'react';
export default function () {
    const p_ = useRef(null);
    useEffect(() => {
        animate(p_.current as any, {
            scale: [
                { to: 1.25, ease: 'inOut(3)', duration: 200 },
                { to: 1, ease: spring({ bounce: .7 }) }
            ],
            loop: true,
            loopDelay: 250,
        })
    }, [])
    return <p ref={p_}>
        test hello
    </p>
}