import Landing from "./components/pages/Landing"
import Zenith from "./components/pages/Zenith"
import { Route, Routes, Navigate } from "react-router-dom"
import { SignIn1 } from "./components/ui/modern-stunning-sign-in"
import { SignUp1 } from "./components/ui/modern-stunning-sign-up"
import Vector from "./components/pages/Vector"
import ResumeAnalysis from "./components/pages/ResumeAnalysis"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/vector" element={<Vector />} />
      <Route path="/zenith" element={<Zenith />} />
      <Route path="/login" element={<SignIn1 />} />
      <Route path="/signin" element={<SignIn1 />} />
      <Route path="/signup" element={<SignUp1 />} />
      <Route path="/resume" element={<ResumeAnalysis />} />

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
