import Graph from '../../components/graph/graph'
import List from '../../components/list/list'
import fakeData from '../../../temp/fakeData'
export default function DashBoard(){
    return (
        <>
             <div className="container">
                    <Graph graphData={fakeData} xlabel={"Subjects"} ylabel={"Attendance"}  heading = {"Attendance"} minRequirement={75}/>
                    <List contentList={fakeData}></List>
                </div> 
            <div className="container">
                <List contentList={fakeData}></List>
                <Graph graphData={fakeData} xlabel={"Subjects"} ylabel={"Attendance"}  heading = {"Attendance"} minRequirement={75} type="line"/>
            </div> 
        </>
    )
}