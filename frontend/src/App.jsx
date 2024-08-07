import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./pages/layout/layout"
import DashBoard from "./pages/dashboard/dashboard"
import LoginPage from "./pages/loginPage/loginPage"
function App() {
  return (
   <>
  <Router>
    <Routes>
      <Route path='/' element={<Layout/>}>
          <Route index element={<LoginPage />}></Route>
          <Route path="/dashboard" element={<DashBoard/>}/>
      </Route>
    </Routes>
  </Router>
   </>
  )
}

export default App
