import { useRef, useState, useEffect } from "react"
import Cross from "./assets/cross"
import Book from "./assets/book"
import File from "./assets/file"
import School from "./assets/school"
import './public/style.css'
export default function ListItem({ content, heading, category}) {
    
    let contentDivRef = useRef(null)
    let contentRef = useRef(null)
    const [active, setActive] = useState(false)


    function dropDown() {
        active ? setActive(false) : setActive(true)
    }

    useEffect(() => {
       active ? ()=>{
            contentDivRef.current.style.display = "block"
        }  
        : ()=>{
            contentDivRef.current ? contentDivRef.current.style.display = "none" : null

        }
    }, [active])

    return (
        <>
            <div className = "listItemDiv border">
                <div className="listItemHeaderDiv" onClick={dropDown}>
                        <button className="listItemHeadingButton" onClick={dropDown}>
                            {category == 1 ? 
                                <Book/> : 
                                category == 2 ? 
                                    <File/> : 
                                        <School/>
                            }
                        </button>
                </div>
            </div>
            {active &&
            <>
                <div ref={contentDivRef} className="listItemContentDiv border">
                    <div className="listItemContentDivHeading">
                        <h6>{heading.toUpperCase()}</h6>
                        <button onClick={dropDown}>
                            <Cross/>
                        </button>
                    </div>
                    <textarea value = {content} className="listItemContent" spellCheck="false" ref={contentRef} disabled/>  
                </div>
            </>
            }

        </>
    )
 }