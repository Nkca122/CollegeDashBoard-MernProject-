import { useEffect, useRef } from "react";
import ThemeDetector from "../../themeDetector/themeDetector";
import './public/style.css'

export default function BarGraph({graphData, xlabel = null, ylabel = null, minRequirement = 75}){
    let isHovered = [false, -1];
    let subjects = JSON.parse(graphData).subjects;
    let graphBarHeights = [];
    let isGraphDrawn = false;
    let drawnCt = 0;
    let isThemeDark = ThemeDetector()
    const canvasRef = useRef(null)
    const CanvasDivRef = useRef(null)
  


    function RequirementLine(ctx, width, minRequirement){
        ctx.beginPath()
        //Requirement line
        let x0 = 15; let y0 = ctx.canvas.height - 15
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgb(236, 11, 67)"
        ctx.setLineDash([2, 2])
        ctx.save()
            ctx.translate(x0, y0)
            ctx.moveTo(x0, -1 * minRequirement)
            ctx.lineTo(ctx.canvas.width, -1 * minRequirement)
        ctx.stroke()
        ctx.restore()
    }
    
    function Bars(ctx, width, subjects, minRequirement){
        if(!isGraphDrawn && !graphBarHeights.length){
            for(let i = 0; i < subjects.length; i++){
                graphBarHeights.push(0)
            }
        }
        
        let position = width;
        let x0 = 15; let y0 = ctx.canvas.height - 15


            ctx.beginPath()
            ctx.save()
                ctx.translate(x0, y0)
                ctx.fillStyle - "white"

                for(let i = 0; i < subjects.length; i++){
                    if(graphBarHeights[i] < subjects[i][1]){
                        graphBarHeights[i] += 0.5;
                    } else {
                        graphBarHeights[i] = subjects[i][1];
                    }
                    ctx.beginPath()
                        ctx.fillStyle = minRequirement < subjects[i][1] ? isThemeDark ? "#eedfcc" : "#7a848d" : (minRequirement - 15) <= subjects[i][1] ? isThemeDark ? "#b19b84" : "#3b4a5c" : isThemeDark ? "#756b55" : "#2e3845";
                        ctx.fillRect(position, -1*graphBarHeights[i], width, graphBarHeights[i] * 1);
                        ctx.font = "12px bold"
                        ctx.save()
                        ctx.translate(position, -1*graphBarHeights[i] - (i%2 == 0 ? 20 : 25))
                        ctx.rotate(-Math.PI/4)
                            ctx.fillText(`${subjects[i][0]}`, 0, 0);
                        ctx.restore()
                        ctx.fillText(`${subjects[i][1]}`, position, -1*graphBarHeights[i]-5)
                        position += 2*width;
                    ctx.fill()
                }
    
                for(let i = 0; i < graphBarHeights.length; i++){
                    if(graphBarHeights[i] == subjects[i][1]){
                        if(drawnCt < subjects.length){
                            drawnCt++;
                        } else {   
                            drawnCt = subjects.length
                        }
                    }
                }
    
                if(drawnCt == subjects.length){
                    isGraphDrawn = true;
                }
            ctx.restore()
    }
    
    function Axes(ctx, width, xlabel, ylabel){
        //Axes
        let x0 = 15; let y0 = ctx.canvas.height - 15
        //Axes
        //x
        ctx.beginPath()
        ctx.strokeStyle = isThemeDark ? "antiquewhite" : "#171d25"
        ctx.setLineDash([])
        ctx.moveTo(x0, y0);
        ctx.lineTo(ctx.canvas.width, y0)
        ctx.stroke()

        //y
        ctx.beginPath()
        ctx.strokeStyle = isThemeDark ? "antiquewhite" : "#171d25"
        ctx.setLineDash([])
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
    
    


    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        let width = 40
        //Label Lines

        //Requirement Lines
        RequirementLine(ctx, width, minRequirement);
        //Bars
        Bars(ctx, width, subjects, minRequirement);
        //Axes
        Axes(ctx, width, xlabel, ylabel)
        //Percentages 
}
    useEffect(() => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      console.log(context.canvas.scrollWidth)
      function resizeCanvas(ctx){
        ctx.canvas.width =  40 * subjects.length * 2.5
        ctx.canvas.height = window.innerHeight * 0.4
      }

      function resizeCanvasDiv(){
        CanvasDivRef.current.scrollLeft = 0;
      }
      resizeCanvas(context)
      resizeCanvasDiv()

      let frameCount = 0
      let animationFrameId

      const render = () => {
        frameCount++
        draw(context)
        animationFrameId = window.requestAnimationFrame(render)
      }

   

      render()

      window.addEventListener("resize", ()=>{
        resizeCanvas(context)
        resizeCanvasDiv()

      })

      
      return () => {
        window.cancelAnimationFrame(animationFrameId)
        window.removeEventListener("resize", ()=>{
            resizeCanvas(context)
            resizeCanvasDiv()
        })
      }
    }, [draw])



    return (
        <>
            <div className="graphDiv border" ref={CanvasDivRef}>
                    <canvas className = "graphCanvas" ref = {canvasRef} />  
            </div>
        </>
    )
}

