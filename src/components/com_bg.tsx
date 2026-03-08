import { ThemeContextTypeTheme, useThemeContext } from "@/hooks/ThemeProvider";
import { useEffect, useRef } from "react";

export default function () {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const theme = useThemeContext()
    useEffect(() => {
        new CanvasBG(canvasRef.current!, theme.config);
    }, [])

    return <canvas
        className="rounded-sm fixed -z-1"
        ref={canvasRef}
    />
}

class CanvasBG {
    private ctx: CanvasRenderingContext2D;
    private dpr = window.devicePixelRatio || 1;

    private objBox = {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight
    }

    constructor(canvas: HTMLCanvasElement, private theme_config: ThemeContextTypeTheme) {

        this.ctx = canvas.getContext("2d")!

        this.resize(canvas)

        window.addEventListener("resize", () => {
            this.resize(canvas)
            this.init()
        })

        document.addEventListener("fullscreenchange", () => {
            this.resize(canvas)
            this.init()
        })

        this.init()
    }

    resize(canvas: HTMLCanvasElement) {

        const w = window.innerWidth
        const h = window.innerHeight

        this.objBox.width = w
        this.objBox.height = h

        canvas.style.width = w + "px"
        canvas.style.height = h + "px"

        canvas.width = w * this.dpr
        canvas.height = h * this.dpr

        // 防止scale叠加
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    }

    init() {

        const ctx = this.ctx
        const box = this.objBox
        const theme = this.theme_config.theme

        ctx.clearRect(0, 0, box.width, box.height)

        ctx.fillStyle = theme[0]
        ctx.fillRect(0, 0, box.width, box.height)

        ctx.beginPath()
        ctx.arc(80, 80, 30, 0, Math.PI * 2)

        ctx.strokeStyle = theme[1]
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.font = "40px Arial"

        ctx.strokeText(import.meta.env.VITE_APPNAME, 20, 100)
    }
}