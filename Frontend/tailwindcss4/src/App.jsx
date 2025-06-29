import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "./pages/landingPage"
import Dashboard from "./pages/dashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Redirect unknown routes to landing */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
