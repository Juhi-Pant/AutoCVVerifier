import React, { useRef, useState, useEffect } from "react";
import DashboardLayout from "../components/dashboard";
import FileUploadPanel from "../components/fileUpload";
import ResultSection from "../components/resultSection";
import RecruiterSkillsForm from "../components/recruiterSkillsForm";
import { ThemeProvider, createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: { mode: "light" },
});

const Dashboard = () => {
  const sessionId = useRef(Date.now().toString() + Math.random().toString(36).substring(2));
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState(null)
  const [isVerified, setIsVerified] = useState(false);
  const [recruiterSkills, setRecruiterSkills] = useState([]);


  useEffect(() => {
    console.log("🔁 Dashboard re-rendered | sessionId:", sessionId.current, "| showResults:", showResults);
  }, [showResults]);
  
  useEffect(() => {
     if(filteredResults != null){
      setShowResults(true);
    }
  }, [filteredResults])

  return (
    <ThemeProvider theme={lightTheme}>
      <DashboardLayout>
        <div className="space-y-6">
          <FileUploadPanel
            sessionId={sessionId.current}
            onComplete={() => setShowResults(true)}
            onVerificationComplete={(success) => {
              if (success) setIsVerified(true);
            }}
          />

          <RecruiterSkillsForm
            sessionId={sessionId.current}
            isVerified={isVerified}
            onResults={(resumes, skillsUsed) => {
              setFilteredResults(resumes);
              setShowResults(true); 
              setRecruiterSkills(skillsUsed);
            }}
          />

          {showResults && Array.isArray(filteredResults) ? (
            <ResultSection
              sessionId={sessionId.current}
              filteredResumes={filteredResults.length > 0 ? filteredResults : null}
              totalSkills={recruiterSkills}
            />
          ) : (
            <p className="text-center text-muted-foreground">Results will appear after verification.</p>
          )}
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
};

export default Dashboard;
