import { useEffect, useRef, useState } from "react";
import ListItem from "./listItem/listItem"
import { v4 as uuid } from 'uuid'
import './public/style.css'
export default function List ({contentList = []}){
    const contents = JSON.parse(contentList).details;
    let pos = {top: 0, left: 0, x: 0, y: 0}
    const ListRef = useRef(null)

    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    })


    function initList(){
        ListRef.current.style.width = window.innerWidth > 800 ? "50vw" : "90vw";
    }

    useEffect(()=>{
        initList()
        function handleResize(){
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
            window.addEventListener("load", handleResize);
            window.addEventListener("resize", handleResize);
        return ()=>{
            window.removeEventListener("load", handleResize);
            window.removeEventListener("resize", handleResize);
        }
    })
   

    

    return (
        <>
        <div className = "list" ref={ListRef}>
            <div className="listHeadingDiv">
                <h3 className="listHeading"><pre>{"Notice Board"}</pre></h3>
            </div>
            <div style={{position:"relative"}}>
                <div className="listItemsDiv">
                    {contents && contents.map(
                        content => 
                            <ListItem heading = {content[0]} content = {content[1]} category={content[2]} key={uuid()}/> 
                    )}
                </div>
            </div>
        </div>
        </>
        
    )
}