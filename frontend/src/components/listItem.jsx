import { useRef, useState} from "react"
import Plus from "../assets/plus"
import Minus from "../assets/minus"
export default function ListItem({content, heading}){
    let contentDivRef = useRef(null)
    let contentRef = useRef(null)
    const [active, setActive] = useState(false)

    const Styles = {
        listItemDiv:{
            display:"block",
            borderRadius:"16px",
            border:"1px solid white",
            backgroundColor:"#171d25",
        },
        listItemHeadingDiv:{
            padding:"1em",
            display:"flex",
            justifyContent:"space-between",
            
        },
        listItemContent:{
            backgroundColor:"white",
            fontSize: "0.85rem",
            resize:"none",
            width:"90%",
            minHeight:"100%",
            border:"none",
            color:"#171d25",
            marginTop:"1em",
            marginBottom:"1em",
        },
        listItemHeadingButton:{
            backgroundColor:"#171d25",
            fontSize:"0.95rem",
            boxShadow:"none",
            border:"none",
        },
        listItemHeading:{
            fontSize:"0.95rem",
            userSelect:"none"
        },
        listItemContentDiv: { 
            backgroundColor:"white",
            maxHeight:"0px",
            overflow:"hidden",
            transition: "all 0.5s linear",
            borderRadius:"16px",
            textAlign:"center"
        },
    }



    function dropDown(){
        const contentDiv = contentDivRef.current
        const contentDivStyle = contentDiv.style

        if(contentDivStyle.maxHeight != "0px"){
            contentDivStyle.maxHeight = "0px"
            setActive(false)
        } else {
            contentDivStyle.maxHeight = max(200, contentRef.current.scrollHeight*1.1) + "px"
            setActive(true)
        }

        contentDivStyle.height = contentDivStyle.maxHeight
    }

    return (
        <>
            <div className="listItemDiv" style={Styles.listItemDiv}>
                <div className="listItemHeadingDiv" style={Styles.listItemHeadingDiv}>
                        <h3 className="listItemHeading" style={Styles.listItemHeading}>
                            {heading.toUpperCase()}
                        </h3>
                        <button className = "listItemHeadingButton" style={Styles.listItemHeadingButton} onClick = {dropDown}>
                            {!active ? <Plus/> : <Minus/>}
                        </button>
                    </div>
                    <div className = "listItemContentDiv" ref = {contentDivRef} style={Styles.listItemContentDiv}>
                        <textarea className = "listItemContent" ref = {contentRef} style={Styles.listItemContent} spellcheck = "false" disabled> 
                            {content}
                        </textarea>
                    </div>
                </div>
        </>
    )
}