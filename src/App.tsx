import Dashbord from "./Pages/Dashbord"
import { LandingPage } from "./Pages/Landingpage"
import { Signin } from "./Pages/Signin"
import { Signup } from "./Pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/signin" element={<Signin />}/>
    <Route path="/dashbord" element={<Dashbord />}/>

    <Route path="/dashbord" element={<Dashbord isShared={false} />} />
    <Route path="/share/:hash" element={<Dashbord isShared={true} />} />

  </Routes>
  </BrowserRouter>
}

export default App
