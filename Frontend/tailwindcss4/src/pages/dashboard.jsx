// Dashboard.jsx
import React, { useRef, useState, useEffect } from "react"
import DashboardLayout from "../components/dashboard"
import FileUploadPanel from "../components/fileUpload"
import ResultSection from "../components/resultSection"
import { ThemeProvider, createTheme } from "@mui/material"

const lightTheme = createTheme({
  palette: { mode: "light" },
})

const Dashboard = () => {
  const sessionId = useRef(Date.now().toString() + Math.random().toString(36).substring(2))
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    console.log("🔁 Dashboard re-rendered | sessionId:", sessionId.current, "| showResults:", showResults)
  }, [showResults])

  return (
    <ThemeProvider theme={lightTheme}>
      <DashboardLayout>
        <div className="space-y-6">
          <FileUploadPanel
            sessionId={sessionId.current}
            onComplete={() => setShowResults(true)}
          />
          {showResults ? (
            <ResultSection sessionId={sessionId.current} />
          ) : (
            <p className="text-center text-muted-foreground">Results will appear after verification.</p>
          )}
        </div>
      </DashboardLayout>
    </ThemeProvider>
  )
}

export default Dashboard
