import { useEffect, useRef, useState } from "react";

export default function Graph({graphData, xlabel = null, ylabel = null, minRequirement = 75, heading = null}){
    let isHovered = [false, -1];
    let subjects = JSON.parse(graphData).subjects;
    let graphBarHeights = [];
    let barsDone = []
    let isGraphDrawn = false;
    let drawnCt = 0;
    const canvasRef = useRef(null)
  


    function showData (e) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d')
        let arrayLength = subjects.length
        let width = ctx.canvas.width/(subjects.length * 2.5);
        let pos = width;
        while(arrayLength--){
            
            if(e.clientX - e.target.offsetLeft >= pos && e.clientX - e.target.offsetLeft <=  pos + width){
                if(e.clientY - e.target.offsetTop <= e.target.height && e.clientY - e.target.offsetTop >= e.target.height - 2 * subjects[subjects.length - arrayLength - 1][1] - 23) {
                    isHovered = [true, subjects.length - arrayLength -1, ctx.canvas.width > 800 ? pos + width/5 : pos, e.target.height - 2 * subjects[subjects.length - arrayLength - 1][1] - 23 - 10]
                } else {
                    isHovered = [false, -1]
                }   
            } 
        pos+=2*width;
        }
    }

    function LabelLines(ctx, width, subjects){
        let position = width;
    
        ctx.beginPath()
        //Label lines
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#D6FFB7"
            ctx.setLineDash([])
                for(let i = 0; i < subjects.length; i++){
                    ctx.moveTo(position + width/2 , ctx.canvas.height - subjects[i][1] * 2 -24);
                    ctx.lineTo(width -10, ctx.canvas.height - subjects[i][1] * 2 -24);
                    position += 2*width
                }
        ctx.stroke();
    }
    
    function RequirementLine(ctx, width, minRequirement){
        ctx.beginPath()
        //Requirement line
    
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgb(236, 11, 67)"
        ctx.setLineDash([2, 2])
            ctx.moveTo(width-10, ctx.canvas.height - 2 * minRequirement -24)
            ctx.lineTo(ctx.canvas.width, ctx.canvas.height - 2*minRequirement -24)
        ctx.stroke()
    }
    
    function Bars(ctx, width, subjects, minRequirement){
        if(!isGraphDrawn && !graphBarHeights.length){
            for(let i = 0; i < subjects.length; i++){
                graphBarHeights.push(0)
            }
        }
        
        let position = width;
    
                for(let i = 0; i < subjects.length; i++){
                    if(graphBarHeights[i] < subjects[i][1]){
                        graphBarHeights[i] += 0.5;
                    } else {
                        graphBarHeights[i] = subjects[i][1];
                    }
                    ctx.beginPath()
                        ctx.fillStyle = minRequirement < subjects[i][1] ? "green" : (minRequirement - 15) <= subjects[i][1] ? "#80b918" : "#bc4749";
                        ctx.fillRect(position, ctx.canvas.height - graphBarHeights[i] * 2 -23, width, graphBarHeights[i] * 2);
                        position += 2*width;
                    ctx.fill()
                }
    
                for(let i = 0; i < graphBarHeights.length; i++){
                    if(graphBarHeights[i] == subjects[i][1]){
                        if(drawnCt < subjects.length && barsDone.indexOf(i) == -1){
                            drawnCt++;
                            barsDone.push(i);
                        } else {   
                            drawnCt = subjects.length
                        }
                    }
                }
    
                if(drawnCt == subjects.length){
                    isGraphDrawn = true;
                }
    }
    
    function Axes(ctx, width, subjects, xlabel, ylabel){
        //Axes
        let position = width;
        ctx.beginPath()
        ctx.strokeStyle = "white";
        ctx.lineWidth = 0.8;
        ctx.setLineDash([])
            ctx.moveTo(width -10 , ctx.canvas.height - 20);
            ctx.lineTo(width -10,  ylabel.length * 10);
    
            ctx.moveTo(width - 10, ctx.canvas.height -20);
            ctx.lineTo(ctx.canvas.width - 5*xlabel.length, ctx.canvas.height-20);
        ctx.stroke();
    
        //Labels
        ctx.beginPath()
        if(window.innerWidth > 800);{
        ctx.fillStyle = "white"
        ctx.font = "bold 12px sans-serif"
            for(let i = 0; i < subjects.length; i++){
                ctx.save()
                            ctx.translate(position + width/5, ctx.canvas.height)
                            ctx.rotate(window.innerWidth > 800 ? -Math.PI/4 : -Math.PI/2)
                            ctx.fillText(subjects[i][0], 0, 0)
                position += 2*width
                ctx.restore()
            }
       ctx.fill()
       }
    
       //Axis labels
            //x
            ctx.beginPath()
            ctx.fillStyle = "white"
            ctx.font = "12px sans-serif"
                ctx.fillText(`${xlabel}`, ctx.canvas.width - 5*xlabel.length, ctx.canvas.height - (3/2) * 10)
            ctx.fill()
            //y
            ctx.beginPath()
            ctx.fillStyle = "white"
            ctx.font = "12px sans-serif"
            ctx.save()
                ctx.translate(width , ylabel.length * (2/3)*12)
                ctx.rotate(-Math.PI/2)
                ctx.fillText(`${ylabel}`, 0 , 0)
            ctx.restore()
            ctx.fill()
    }
    
    


    const draw = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        let width = ctx.canvas.width/(subjects.length * 2.5);
        //Label Lines
        LabelLines(ctx, width, subjects);
        //Requirement Lines
        RequirementLine(ctx, width, minRequirement);
        //Bars
        Bars(ctx, width, subjects, minRequirement);
        //Axes
        Axes(ctx, width, subjects,  xlabel, ylabel)
        //Percentages 
        if(isHovered[0]){
            let label = subjects[isHovered[1]][1]
            ctx.beginPath()
            ctx.font = "bold 12px sans-serif"
            ctx.fillStyle = "white"
                ctx.fillText(`${label}%` , isHovered[2], isHovered[3])
            ctx.fill()
    }
}

    const Styles = {
        graphDiv:{
            display: "flex",
            padding: "1em",
            borderRadius: "16px",
            border: "1px solid white",
            backgroundColor:"#171d25"
        },
        graphCanvas:{
            borderRadius: "0",
            border: "1px solid transparent"

        }   
    }
    
    useEffect(() => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')


      let frameCount = 0
      let animationFrameId

      const render = () => {
        frameCount++
        draw(context)
        animationFrameId = window.requestAnimationFrame(render)
      }

      const resizeCanvas = (ctx) => {
        ctx.canvas.width = window.innerWidth > 800 ? window.innerWidth * 0.5 : window.innerWidth * 0.8
        ctx.canvas.height = window.innerHeight * 0.4
      }

      render()
      resizeCanvas(context)
      
      window.addEventListener("load", ()=>{
        resizeCanvas(context)
      })

      window.addEventListener("resize", ()=>{
        resizeCanvas(context)

      })

      
      return () => {
        window.cancelAnimationFrame(animationFrameId)
        window.removeEventListener("load", ()=>{
            resizeCanvas(context)
        })
        window.removeEventListener("resize", ()=>{
            resizeCanvas(context)
        })
      }
    }, [draw])



    return (
        <>
            <div className="graphDiv" style = {Styles.graphDiv}>
                    <canvas className = "graphCanvas" ref = {canvasRef} style={Styles.graphCanvas} onMouseMove={showData} onTouchStart = {showData} onMouseLeave={()=>{
                        isHovered = [false, -1]
                    }} 
                    onTouchEnd={()=>{
                        isHovered = [false, -1]
                    }}></canvas>  
            </div>
        </>
    )
}

