import { useRef, useState, useEffect } from "react"
import Plus from "../assets/plus"
import Minus from "../assets/minus"
export default function ListItem({ content, heading }) {
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
            fontSize: "0.85rem",
            userSelect: "none",
            color: "#171d25"
        },
        listItemHeadingButton: {
            backgroundColor: "transparent",
            fontSize: "1rem",
            border: "none",
            color: "#171d25"
        },
        listItemContentDiv: {
            transition: "height 5s linear",
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
                justifyContent:"center",
                alignItems:"center",
            //Accordion
            maxHeight: "0",
            overflow: "hidden",
            
        },
        listItemContent: {
            transition: "all 5s linear",
            backgroundColor: "#171d25",
            fontSize: "0.85rem",
            height: "50%",
            width: "90%",
            color: "white",
            margin: "1em",
        },
    }



    function dropDown() {
        active ? setActive(false) : setActive(true)
    }

    useEffect(() => {
        if(active) {
            if(contentDivRef.current.style.height != "0px"){
                contentDivRef.current.style.height = "0px"
            } else {
                contentDivRef.current.style.maxHeight = "100%"
        }
        }
       
    }, [active])

    return (
        <>
            <div style={Styles.listItemDiv} onClick={dropDown}>
                <div style={Styles.listItemHeaderDiv}>
                    <h3 style={Styles.listItemHeading}>
                        {heading.toUpperCase()}
                    </h3>
                    <button style={Styles.listItemHeadingButton}>
                        {!active ? <Plus /> : <Minus />}
                    </button>
                </div>
            </div>
            {active &&
                <div ref={contentDivRef} style={Styles.listItemContentDiv}>
                    <textarea value={content} ref={contentRef} style={Styles.listItemContent} spellCheck={false} disabled />
                </div>
            }

        </>
    )
}