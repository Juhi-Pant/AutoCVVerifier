import { useEffect, useState } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  FileText,
  Github
} from "lucide-react";
import { motion } from "framer-motion";

export default function ResultSection({ sessionId }) {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedStates, setExpandedStates] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/resumes/${sessionId}`);
        setResumes(response.data);
        setExpandedStates(new Array(response.data.length).fill(false));
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchResumes();
    }
  }, [sessionId]);

  const toggleExpanded = (index) => {
    setExpandedStates((prev) =>
      prev.map((val, i) => (i === index ? !val : val))
    );
  };

  const getScoreBadge = (score) => {
    if (score >= 85) return "bg-green-900/20 text-green-400 border-green-400/30";
    if (score >= 60) return "bg-yellow-900/20 text-yellow-400 border-yellow-400/30";
    return "bg-red-900/20 text-red-400 border-red-400/30";
  };

  const getTopSkills = (githubAnalysis) => {
  const skillFrequency = {};

  githubAnalysis?.forEach(repo => {
    const skills = repo?.scoreDetails?.skillMatch?.detected || [];
    skills.forEach(skill => {
      skillFrequency[skill] = (skillFrequency[skill] || 0) + 1;
    });
  });

  return Object.entries(skillFrequency)
    .sort((a, b) => b[1] - a[1]) // sort by frequency
    .slice(0, 3) // top 3
    .map(([skill]) => skill);
};


  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <h2 className="text-2xl font-bold text-[#64ffda]">Verification Results</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume, idx) => {
          const meanScore = Math.round(
            (resume.githubAnalysis?.reduce((sum, repo) => sum + (repo.score || 0), 0) || 0) /
            (resume.githubAnalysis?.reduce((sum, repo) => sum + (repo.outOf || 100), 0) || 1) * 100
          );

          const expanded = expandedStates[idx] || false;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-[#112240] rounded-xl shadow-lg border border-[#1f2d48] overflow-hidden h-full flex flex-col">
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#64ffda] flex-shrink-0" />
                      <h3 className="text-lg font-semibold text-[#ccd6f6] truncate">
                        {resume?.resume?.filename || "Untitled Resume"}
                      </h3>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getScoreBadge(meanScore)} border`}>
                      {meanScore}%
                    </span>
                  </div>

                  {resume.githubAnalysis?.length > 0 && (
                    <div className="mt-4 text-sm text-[#8892b0]">
                      <div className="flex items-center mb-1">
                        <Github className="h-4 w-4 mr-2" />
                        <span>{resume.githubAnalysis.length} GitHub repos found</span>
                      </div>
                      <div className="mt-1">
                        <span className="font-medium text-[#64ffda]">Top Skills: </span>
                        {getTopSkills(resume.githubAnalysis).join(', ') || 'N/A'}
                      </div>
                    </div>
                  )}
                </div>

                {resume.githubAnalysis?.length > 0 ? (
                  <>
                    <div className="px-6 pb-4 flex-1">
                      {expanded ? (
                        <div className="space-y-3">
                          {resume.githubAnalysis.map((repo, rIdx) => {
                            const details = repo.scoreDetails || {};
                            const percentScore = Math.round((repo.score / repo.outOf) * 100);

                            return (
                              <motion.div
                                key={rIdx}
                                className="border border-[#1f2d48] rounded-lg p-3 bg-[#0a192f]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: rIdx * 0.05 }}
                              >
                                <div className="font-medium text-[#64ffda] mb-1 truncate text-sm">
                                  {repo.url.replace(/^https?:\/\//, '')}
                                </div>
                                <div className="text-xs mb-1 text-[#8892b0]">Score: {percentScore}%</div>
                                <div className="text-xs mb-1 text-[#8892b0]">Owner: {repo.url.split("/")[3]}</div>
                                <div className="text-xs mb-2 text-[#8892b0]">Commits: {repo.scoreDetails?.commitCount || 0}</div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <StatusBadge condition={details.repoExists} label="Repo Exists" />
                                  <StatusBadge condition={!details.isFork} label="Not a Fork" />
                                  <StatusBadge condition={details.commitCount >= 5} label={`${details.commitCount} Commits`} />
                                  <StatusBadge condition={!details.noLicense} label="Has License" />
                                  <StatusBadge condition={!details.licenseMismatch} label="License OK" />
                                  <StatusBadge condition={!details.licenseYearMismatch} label="Year OK" />
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-[#8892b0]">Click below to view GitHub analysis details</p>
                      )}
                    </div>

                    <button
                      onClick={() => toggleExpanded(idx)}
                      className="w-full py-3 text-sm font-medium text-[#64ffda] hover:bg-[#1f2d48] transition-colors flex items-center justify-center gap-1"
                    >
                      {expanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" /> Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" /> View Details
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <div className="px-6 pb-6">
                    <p className="text-sm text-[#8892b0] italic">No GitHub links found in this resume</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function StatusBadge({ condition, label }) {
  return (
    <motion.div
      className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
        condition
          ? "bg-green-900/10 text-green-400 border border-green-400/20"
          : "bg-red-900/10 text-red-400 border border-red-400/20"
      }`}
      whileHover={{ scale: 1.03 }}
    >
      {condition ? (
        <CheckCircle className="h-3 w-3" />
      ) : (
        <XCircle className="h-3 w-3" />
      )}
      {label}
    </motion.div>
  );
}
