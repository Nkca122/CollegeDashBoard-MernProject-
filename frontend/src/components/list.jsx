import { useEffect, useRef, useState } from "react";
import ListItem from "./listItem"
import { v4 as uuid } from 'uuid'
export default function List ({contentList = []}){
    const contents = JSON.parse(contentList).details;
    let pos = {top: 0, left: 0, x: 0, y: 0}
    const ListRef = useRef(null)
    const headingRef = useRef(null)

    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    })
    const Styles = {
        listItem:{
            listStylePosition:"inside",
            display:"block",
            width:"100%",
            marginTop:"1em",
            marginBottom:"1em",

        },
        list:{
            width: (window.innerWidth > 800 ? "30vw" : "90vw"),
            paddingTop:"1em",
            paddingLeft:"1em",
            paddingRight:"1em",
            maxHeight: "30vh",
            margin:"auto",
            backgroundColor:"transparent",
            overflowY:"scroll",
            overflowX: "hidden",
            borderBottom: "1px solid white",
            borderTop: "1px solid white",
            cursor: "grab"
        },
        listHeading:{
            width:"100%",
            fontWeight:"900",
            textAlign:"center",
            fontFamily:"Arial",
            color:"white",
            userSelect:"none"
        }
    }

    function initList(){
        const List = ListRef.current
        List.width = window.innerWidth > 800 ? window.innerWidth * 0.3 : window.innerWidth * 0.9
    }

    function mouseMoveHandler(e){
        const dx = -pos.x + e.clientX
        const dy = -pos.y + e.clientY

        ListRef.current.scrollTop = pos.top - dy
        ListRef.current.scrollLeft = pos.left - dx
    }

    function mouseUpHandler(e){
        ListRef.current.removeEventListener('mousemove', mouseMoveHandler)
        ListRef.current.removeEventListener('mouseup', mouseUpHandler)

        ListRef.current.style.cursor = "grab"
    }

    function mouseDownHandler(e){

        
        ListRef.current.addEventListener('mousemove', mouseMoveHandler)
        ListRef.current.addEventListener('mouseup', mouseUpHandler);
        pos = {
            left: ListRef.current.scrollLeft,
            top: ListRef.current.scrollTop,
            x: e.clientX,
            y: e.clientY,
        }
        ListRef.current.style.cursor = "grabbing"
    }



   
    useEffect(function handleResize(){
        initList()
        function handleResize() {
            setDimensions({
              width: window.innerWidth,
              height: window.innerHeight,
            });
        }
          window.addEventListener("resize", handleResize);
          window.addEventListener("load", handleResize)
          handleResize();
          return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("load", handleResize)
        };

    }, [])

    

    return (
        <>
        <div style={Styles.list} ref={ListRef} onMouseDown={mouseDownHandler} onTouchHold={mouseDownHandler}>
                <div key={"heading"} style={{listStyle: "none"}}><h3 className="listHeading" style={Styles.listHeading} ref={headingRef}><pre>{"Notice Board"}</pre></h3></div>
                {contents && contents.map(
                    content => 
                        <div className = "listItem" style = {Styles.listItem} key = {uuid()}>
                                <ListItem heading = {content[0]} content = {content[1]}/>
                        </div>
                            
                )}
        </div>
        </>
        
    )
}