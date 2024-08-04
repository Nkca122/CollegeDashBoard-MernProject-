import fakeData from "../assets/fakeData"
import List from "./components/list"
import Graph from "./components/graph"
function App() {
  return (
    <>
      <div>
        <Graph graphData={fakeData} xlabel={"Subjects"} ylabel={"Attendance"}  heading = {"Attendance"} minRequirement={75}/>
        <List contentList={fakeData}></List>
      </div> 
    </>
  )
}

export default App
