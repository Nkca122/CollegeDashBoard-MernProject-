import { useEffect, useRef, useState } from "react";
import ListItem from "./listItem/listItem"
import { v4 as uuid } from 'uuid'
import './public/style.css'
export default function List ({contentList = []}){
    const contents = JSON.parse(contentList).details;
    const ListRef = useRef(null)
    return (
        <>
        <div className = "list" ref={ListRef}>
            <div className="border"style={{position:"relative"}}>
                <div className="listItemsDiv">
                    {contents && contents.map( 
                        (content) => {
                            const id = uuid();
                            console.log(id);
                            return <ListItem heading = {content[0]} content = {content[1]} category={content[2]} ID_ = {`${id}`} key= {id}/> 
                    })}
                </div>
            </div>
        </div>
        </>
        
    )
}