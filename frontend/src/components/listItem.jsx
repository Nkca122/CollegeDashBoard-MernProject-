import { useRef, useState, useEffect } from "react"
import Plus from "../assets/plus"
import Minus from "../assets/minus"
import Cross from "../assets/cross"
import Book from "../assets/book"
import File from "../assets/file"
import School from "../assets/school"
export default function ListItem({ content, heading, category}) {
    let contentDivRef = useRef(null)
    let contentRef = useRef(null)
    const [active, setActive] = useState(false)

    const Styles = {
        listItemDiv: {
            //Sizing the whole component
            width: "100%",
            height: "11.5vh",
            padding: "1em",
            border: "1px solid #171d25",
            backgroundColor: "white",
        },
        listItemHeaderDiv: {
            //Aligning header content
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",

        },
        listItemHeading: {
            fontSize: "0.8rem",
            userSelect: "none",
            color: "#171d25"
        },
        listItemHeadingButton: {
            backgroundColor: "transparent",
            fontSize: "0.8rem",
            border: "none",
            color: "#171d25"
        },
        listItemContentDiv: {

            //Positioning
                position: "absolute",
                top: "0",
                right: "0",
                zIndex:"1",
            //Sizing
                width: "70%",
            //Color
                backgroundColor: "#171d25",
            //Border
                border:"1px solid white",
            //display
                display:"flex",
                flexDirection:"column",
                justifyContent:"flex-start",
                alignItems:"center",
            //Accordion
            overflow: "hidden",
            transition: "all 0.2s linear",
            padding:"1em",
            height:"40vh"
        },
        listItemContentDivHeading:{
            padding:"1em",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            width:"90%",
            border:"1px solid white"

        },
        listItemContent: {
            backgroundColor: "#171d25",
            color: "white",
            fontSize: "0.8rem",
            maxHeight:"90%",
            width: "90%",
            resize:"none",
            overflow:"auto",
            padding:"1em"
        },
    }



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
            <div style={Styles.listItemDiv} onClick={dropDown}>
                <div style={Styles.listItemHeaderDiv}>
                    <h3 style={Styles.listItemHeading}>
                        {category == 1 ? <Book/> : category == 2 ? <File/>: <School/>}
                    </h3>
                    <button style={Styles.listItemHeadingButton}>
                        {!active ? <Plus /> : <Minus />}
                    </button>
                </div>
            </div>
            {active &&
            <>
                <div ref={contentDivRef} style={Styles.listItemContentDiv}>
                    <div style={Styles.listItemContentDivHeading}>
                        <h6>{heading.toUpperCase()}</h6>
                        <button onClick={dropDown} style={{backgroundColor:"#171d25", color:"white", border:"none"}}><Cross/></button>
                    </div>
                    <textarea value = {content} style={Styles.listItemContent} spellCheck="false" ref={contentRef} disabled/>  
                </div>
            </>
            }

        </>
    )
 }