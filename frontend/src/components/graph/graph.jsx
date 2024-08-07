import BarGraph from "./barGraph/bargraph"
import LineGraph from "./lineGraph/linegraph"
export default function Graph({graphData, xlabel = null, ylabel = null, minRequirement = 75, type="graph"}){
    return (
        <>
        {type == "line" ? <LineGraph graphData={graphData} xlabel={xlabel} ylabel={ylabel} minRequirement = {minRequirement}/> :
                <BarGraph graphData={graphData} xlabel={xlabel} ylabel={ylabel} minRequirement = {minRequirement}/>}
        </>
    )
}