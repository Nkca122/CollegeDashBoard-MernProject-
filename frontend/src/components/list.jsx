import { useEffect, useRef, useState } from "react";
import ListItem from "./listItem"
import { v4 as uuid } from 'uuid'
export default function List ({contentList = []}){
    const contents = JSON.parse(contentList).details;
    let pos = {top: 0, left: 0, x: 0, y: 0}

    const [dimensions, setDimensions] = useState({
        width: null,
        height: null
    })

    const Styles = {
        list:{
            width: "90vw",
            margin:"auto",
            maxHeight : "30vh",
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
            maxHeight:"30vh",
            overflowY:"scroll",
            scrollbarColor:"#171d52 transparent"
        }
    }

   

    

    return (
        <>
        <div style={Styles.list}>
            <div style={Styles.listHeadingDiv}>
                <h3 style={Styles.listHeading}><pre>{"Notice Board"}</pre></h3>
            </div>
            <div style={{position:"relative"}}>
                <div style={Styles.listItemsDiv}>
                    {contents && contents.map(
                        content => 
                                    <ListItem heading = {content[0]} content = {content[1]}/> 
                    )}
                </div>
            </div>
        </div>
        </>
        
    )
}