import { useRef, useEffect } from "react";
import ThemeDetector from "../../themeDetector/themeDetector";
export default function LineGraph({ graphData, xlabel = null, ylabel = null }) {
    let subjects = JSON.parse(graphData).semesters;
    let isThemeDark = ThemeDetector()
    const canvasRef = useRef(null)
    const CanvasDivRef = useRef(null)


    function Axes(ctx, width, xlabel, ylabel) {

        let x0 = 15; let y0 = ctx.canvas.height - 15
        //Axes
        //x
        ctx.beginPath()
        ctx.strokeStyle = isThemeDark ? "antiquewhite" : "#171d25"
        ctx.moveTo(x0, y0);
        ctx.lineTo(ctx.canvas.width - 15, y0)
        ctx.stroke()

        //y
        ctx.beginPath()
        ctx.strokeStyle = isThemeDark ? "antiquewhite" : "#171d25"
        ctx.moveTo(x0, y0);
        ctx.lineTo(x0, 15)
        ctx.stroke()


        //Axis labels
        //x
            ctx.beginPath()
            ctx.fillStyle = isThemeDark ? "antiquewhite" : "#171d25"
            ctx.font = '0.65rem bold'
            ctx.fillText(`x-axis: ${xlabel.toLowerCase()}`, x0 + 2 * width,  width)
            ctx.fillRect(x0 + width / 2, width/2, width, width)
            ctx.fill()

            //y
            ctx.beginPath()
            ctx.fillStyle = isThemeDark ? "antiquewhite" : "#171d25"
            ctx.font = '0.65rem bold'
            ctx.fillText(`y-axis: ${ylabel.toLowerCase()}`, x0 + 2 * width, width * 2.1)
            ctx.fillRect(x0 + width / 2, width * 1.6, width, width)
            ctx.fill()


    }

    function Lines(ctx, width, subjects){
        let x0 = 15; let y0 = ctx.canvas.height - 15
        let position = width
        ctx.save()
            ctx.translate(x0, y0)
            ctx.beginPath();
            ctx.strokeStyle = isThemeDark ? "antiquewhite" : "#171d25"
            ctx.fillStyle = isThemeDark ? "antiquewhite" : "#171d25"
            ctx.moveTo(0,0);
        for(let i = 0; i < subjects.length; i++){
            ctx.lineTo(position, -1*subjects[i][1] -15)
            ctx.arc(position, -1*subjects[i][1] -15, 2, 0, 2*Math.PI)
            ctx.font = "0.65rem bold arial"
            ctx.fillText(`${subjects[i][1]}`, position + 7, -1*subjects[i][1]-15)
            ctx.fillText(`${subjects[i][0]}`, position + 7, -1*subjects[i][1])
            position += 2 * width;
        }
        ctx.stroke()
        ctx.restore()



    }




    const draw = (ctx) => {
        let width = 40
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        Axes(ctx, width, xlabel, ylabel)
        Lines(ctx, width, subjects)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        console.log(context.canvas.scrollWidth)
        function resizeCanvas(ctx) {
            ctx.canvas.width = 40 * subjects.length * 2.5
            ctx.canvas.height = window.innerHeight * 0.4
        }

        function resetCanvasDiv() {
            CanvasDivRef.current.scrollLeft = 0;
        }
        resizeCanvas(context)
        resetCanvasDiv()

        let frameCount = 0
        let animationFrameId

        const render = () => {
            frameCount++
            draw(context)
            animationFrameId = window.requestAnimationFrame(render)
        }



        render()

        window.addEventListener("resize", () => {
            resizeCanvas(context)
            resetCanvasDiv()

        })


        return () => {
            window.cancelAnimationFrame(animationFrameId)
            window.removeEventListener("resize", () => {
                resizeCanvas(context)
                resetCanvasDiv()
            })
        }
    }, [draw])



    return (
        <>
            <div className="graphDiv border" ref={CanvasDivRef}>
                <canvas className="graphCanvas" ref={canvasRef}></canvas>
            </div>
        </>
    )
}