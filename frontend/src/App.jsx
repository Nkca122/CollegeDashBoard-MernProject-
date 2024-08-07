import fakeData from "../temp/fakeData"
import List from "./components/list/list"
import Graph from "./components/graph/graph"
import Footer from "./components/footer/footer"
import Header from "./components/header/header"
function App() {
  return (
    <div id = "app">
      <Header/>
      <div id="container">
        <div className="container">
            <Graph graphData={fakeData} xlabel={"Subjects"} ylabel={"Attendance"}  heading = {"Attendance"} minRequirement={75}/>
            <List contentList={fakeData}></List>
        </div> 
        <div className="container">
            <List contentList={fakeData}></List>
            <Graph graphData={fakeData} xlabel={"Subjects"} ylabel={"Attendance"}  heading = {"Attendance"} minRequirement={75} type="line"/>
        </div> 

      </div>
      <Footer/>
    </div>
  )
}

export default App
