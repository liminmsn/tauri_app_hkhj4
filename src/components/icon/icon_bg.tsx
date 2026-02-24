import { ReactNode } from "react";

export default function ({ children }: { children: ReactNode }) {
    return <div className="relative z-10">
        <svg className="absolute top-0 -z-1" width="100%" height="100%"  fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_g_13_626)">
                <rect x="4" y="4" width="100%" height="120%" id="card_bg" fill="var(--theme_0)" />
            </g>
            <defs>
                <filter id="filter0_g_13_626" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.25 0.25" numOctaves="3" seed="6125" />
                    <feDisplacementMap in="shape" scale="8" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_13_626">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
        {children}
    </div>
}