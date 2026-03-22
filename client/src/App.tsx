import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Problems from "./pages/Problems"
import ProblemDetail from "./pages/ProblemDetail"
import Login from "./pages/Login"
import Register from "./pages/Register"
// import './App.css'
function App() {
  return(
    <>
    <title>Leetcode</title>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/problems" element={<Problems />}/>
        <Route path="/problems/:slug" element={<ProblemDetail/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App