import React from "react"
import DashboardLayout from "./components/dashboard"
import FileUploadPanel from "./components/fileUpload"
import ResultSection from "./components/resultSection" 
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const theme = lightTheme;

function App() {
  return (
    <ThemeProvider theme={theme}>
    <DashboardLayout>
      <div className="space-y-6">
        <FileUploadPanel />
        <ResultSection />
      </div>
    </DashboardLayout>
    </ThemeProvider>
  )
}

export default App
