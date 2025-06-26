"use client"

import { useState } from "react"
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  GithubIcon,
  LinkedinIcon,
  XCircleIcon,
} from "lucide-react"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"

// Mock data for demonstration
const mockResults = [
  {
    id: 1,
    name: "Alex Johnson",
    trustScore: 92,
    github: true,
    techStackMatch: true,
    linkedinVerified: true,
    techStack: ["React", "Node.js", "TypeScript"],
    experience: [
      { company: "Tech Solutions Inc.", position: "Senior Developer", duration: "2019-2023" },
      { company: "Digital Innovations", position: "Frontend Developer", duration: "2016-2019" },
    ],
  },
  {
    id: 2,
    name: "Sam Williams",
    trustScore: 78,
    github: true,
    techStackMatch: false,
    linkedinVerified: true,
    techStack: ["Angular", "Python", "MongoDB"],
    experience: [
      { company: "WebDev Studios", position: "Full Stack Developer", duration: "2020-2023" },
      { company: "CodeCraft", position: "Junior Developer", duration: "2018-2020" },
    ],
  },
  {
    id: 3,
    name: "Taylor Smith",
    trustScore: 65,
    github: false,
    techStackMatch: true,
    linkedinVerified: true,
    techStack: ["Vue.js", "Express", "PostgreSQL"],
    experience: [
      { company: "Innovative Tech", position: "Backend Developer", duration: "2021-2023" },
    ],
  },
  {
    id: 4,
    name: "Jordan Lee",
    trustScore: 88,
    github: true,
    techStackMatch: true,
    linkedinVerified: false,
    techStack: ["React", "Django", "AWS"],
    experience: [
      { company: "Cloud Solutions", position: "DevOps Engineer", duration: "2020-2023" },
      { company: "Tech Innovators", position: "System Administrator", duration: "2017-2020" },
    ],
  },
]

export default function ResultsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#723e31]">Verification Results</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockResults.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  )
}

function ResultCard({ result }) {
  const [expanded, setExpanded] = useState(false)

  const getTrustScoreColor = (score) => {
    if (score >= 85) return "bg-green-100 text-green-800 "
    if (score >= 70) return "bg-yellow-100 text-yellow-800 "
    return "bg-red-100 text-red-800 "
  }

  return (
    <Card className="overflow-hidden border-[#d9d2cc] bg-white transition-all duration-200 hover:shadow-md ">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium text-[#723e31] ">{result.name}</CardTitle>
          <Badge className={getTrustScoreColor(result.trustScore)}>Score: {result.trustScore}%</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={result.github ? "outline" : "destructive"}
              className={result.github ? "border-green-500 text-green-700 " : ""}
            >
              {result.github ? <CheckCircleIcon className="mr-1 h-3 w-3" /> : <XCircleIcon className="mr-1 h-3 w-3" />}
              GitHub
            </Badge>

            <Badge
              variant={result.techStackMatch ? "outline" : "destructive"}
              className={result.techStackMatch ? "border-green-500 text-green-700 " : ""}
            >
              {result.techStackMatch ? <CheckCircleIcon className="mr-1 h-3 w-3" /> : <XCircleIcon className="mr-1 h-3 w-3" />}
              Tech Stack
            </Badge>

            <Badge
              variant={result.linkedinVerified ? "outline" : "destructive"}
              className={result.linkedinVerified ? "border-green-500 text-green-700 " : ""}
            >
              {result.linkedinVerified ? <CheckCircleIcon className="mr-1 h-3 w-3" /> : <XCircleIcon className="mr-1 h-3 w-3" />}
              LinkedIn
            </Badge>
          </div>

          {expanded && (
            <div className="mt-4 space-y-4 pt-2">
              <div>
                <h4 className="mb-1 text-sm font-medium text-[#723e31] ">Tech Stack</h4>
                <div className="flex flex-wrap gap-1">
                  {result.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-[#f2f1ef] ">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-[#723e31] ">Experience</h4>
                <div className="space-y-2">
                  {result.experience.map((exp, index) => (
                    <div key={index} className="rounded-md bg-[#f2f1ef] p-2 ">
                      <div className="font-medium">{exp.company}</div>
                      <div className="text-sm text-gray-600 ">{exp.position}</div>
                      <div className="text-xs text-gray-500 ">{exp.duration}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1 border-[#a67564] text-[#723e31] hover:bg-[#d9d2cc]/20 "
                >
                  <LinkedinIcon className="h-3 w-3" />
                  LinkedIn Profile
                </Button>
                {result.github && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 border-[#a67564] text-[#723e31] hover:bg-[#d9d2cc]/20 "
                  >
                    <GithubIcon className="h-3 w-3" />
                    GitHub
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center pt-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-[#a67564] hover:bg-[#f2f1ef] hover:text-[#723e31]  "
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <ChevronUpIcon className="mr-1 h-4 w-4" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDownIcon className="mr-1 h-4 w-4" />
              View Details
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
