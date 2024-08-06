import fakeData from "../temp/fakeData"
import List from "./components/list/list"
import Graph from "./components/graph/graph"
function App() {
  return (
    <>
      <div className="container">
        <Graph graphData={fakeData} xlabel={"Subjects"} ylabel={"Attendance"}  heading = {"Attendance"} minRequirement={75}/>
        <List contentList={fakeData}></List>
      </div> 
    </>
  )
}

export default App
