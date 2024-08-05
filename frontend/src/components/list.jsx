import { useEffect, useRef, useState } from "react";
import ListItem from "./listItem"
import { v4 as uuid } from 'uuid'
export default function List ({contentList = []}){
    const contents = JSON.parse(contentList).details;
    let pos = {top: 0, left: 0, x: 0, y: 0}
    const ListRef = useRef(null)

    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    })

    const Styles = {
        list:{
            width: window.innerWidth > 800 ? "50vw" : "90vw",
            maxHeight : "40vh",
        },
        listHeadingDiv:{
            width: "100%"
        },
        listHeading:{
            display:"flex",
            padding:"auto",
            //Text formatting
                fontWeight:"900",
                fontSize:"1.2rem", 
                color:"white",
            userSelect:"none"
        },
        listItemsDiv:{
            width:"30%",
            maxHeight:"40vh",
            overflowY:"scroll",
            scrollbarColor:"#171d52 transparent"
        }
    }

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
        <div style={Styles.list} ref={ListRef}>
            <div style={Styles.listHeadingDiv}>
                <h3 style={Styles.listHeading}><pre>{"Notice Board"}</pre></h3>
            </div>
            <div style={{position:"relative"}}>
                <div style={Styles.listItemsDiv}>
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