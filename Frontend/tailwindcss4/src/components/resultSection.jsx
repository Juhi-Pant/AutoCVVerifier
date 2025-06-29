"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

const calculateScore = (details) => {
  let score = 0
  if (details.repoExists) score += 20
  if (!details.isFork) score += 15
  if (details.commitCount >= 5) score += 25
  if (!details.noLicense) score += 10
  if (!details.licenseMismatch) score += 15
  if (!details.licenseYearMismatch) score += 15
  return score
}

const calculateMeanScore = (repos = []) => {
  if (!repos.length) return 0
  const total = repos.reduce((sum, repo) => sum + calculateScore(repo.scoreDetails || {}), 0)
  return Math.round(total / repos.length)
}

export default function ResultSection({ sessionId }) {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(false)
  const [expandedStates, setExpandedStates] = useState([])

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`http://localhost:5000/api/resumes/${sessionId}`)
        setResumes(response.data)
        setExpandedStates(new Array(response.data.length).fill(false))
      } catch (error) {
        console.error("Failed to fetch resumes:", error)
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      fetchResumes()
    }
  }, [sessionId])

  const toggleExpanded = (index) => {
    setExpandedStates((prev) =>
      prev.map((val, i) => (i === index ? !val : val))
    )
  }

  if (loading) return <p className="text-center text-muted-foreground">Loading results...</p>
  if (!resumes.length) return <p className="text-center text-muted-foreground">No resumes analyzed yet.</p>

  const getScoreBadge = (score) => {
    if (score >= 85) return "bg-green-100 text-green-800"
    if (score >= 60) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#723e31]">Verification Results</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume, idx) => {
          const meanScore = calculateMeanScore(resume.githubAnalysis || [])
          const expanded = expandedStates[idx] || false

          return (
            <Card key={idx} className="bg-white border-[#ddd4cd] hover:shadow-lg rounded-2xl">
              <CardHeader className="pb-1">
                <CardTitle className="text-xl font-semibold text-[#502b24] truncate flex items-center gap-2">
                  📄 {resume?.resume?.filename || "Untitled Resume"}
                </CardTitle>
                <div className="mt-2">
                  <Badge className={`text-sm px-3 py-1 rounded-full ${getScoreBadge(meanScore)}`}>
                    Mean Score: {meanScore}%
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                {!resume.githubAnalysis?.length ? (
                  <p className="text-sm italic text-muted-foreground">
                    No GitHub links found in this resume.
                  </p>
                ) : expanded ? (
                  <div className="space-y-4">
                    {resume.githubAnalysis.map((repo, rIdx) => {
                      const details = repo.scoreDetails || {}
                      const score = calculateScore(details)

                      return (
                        <div key={rIdx} className="border rounded-lg p-3 bg-[#f9f9f9]">
                          <div className="font-medium text-[#5d4037] mb-1 truncate">{repo.url}</div>
                          <div className="text-sm mb-2 text-muted-foreground">Repo Score: {score}%</div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <StatusBadge condition={details.repoExists} label="Repo Exists" />
                            <StatusBadge condition={!details.isFork} label="Not a Fork" />
                            <StatusBadge condition={details.commitCount >= 5} label={`${details.commitCount} Commits`} />
                            <StatusBadge condition={!details.noLicense} label="Has License" />
                            <StatusBadge condition={!details.licenseMismatch} label="License OK" />
                            <StatusBadge condition={!details.licenseYearMismatch} label="Year OK" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-[#666]">Click below to view GitHub analysis details.</p>
                )}
              </CardContent>

              {resume.githubAnalysis?.length > 0 && (
                <CardFooter className="pt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-[#8a5c4d] hover:bg-[#f3f0ed] hover:text-[#502b24]"
                    onClick={() => toggleExpanded(idx)}
                  >
                    {expanded ? (
                      <>
                        <ChevronUpIcon className="h-4 w-4 mr-1" /> Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDownIcon className="h-4 w-4 mr-1" /> View GitHub Details
                      </>
                    )}
                  </Button>
                </CardFooter>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function StatusBadge({ condition, label }) {
  return (
    <Badge
      variant="outline"
      className={`flex items-center justify-center gap-1 px-2 py-1 ${
        condition ? "border-green-500 text-green-700" : "border-red-500 text-red-700"
      }`}
    >
      {condition ? <CheckCircleIcon className="h-3 w-3" /> : <XCircleIcon className="h-3 w-3" />}
      {label}
    </Badge>
  )
}
