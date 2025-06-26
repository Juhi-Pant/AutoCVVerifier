"use client"

import { XIcon } from "lucide-react"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Slider } from "../ui/slider"

export function FilterPanel({ show, onClose }) {
  const handleTrustScoreChange = (value) => {
    console.log("Trust score filter:", value[0])
  }

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 transform overflow-y-auto border-r border-[#d9d2cc] bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 md:static md:z-0 md:block md:transform-none md:transition-none ${
        show ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium text-[#723e31] dark:text-[#d9b18e]">Filters</h3>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
          <XIcon className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <Separator className="mb-4 bg-[#d9d2cc] dark:bg-gray-800" />

      {/* Trust Score */}
      <div className="mb-6">
        <h4 className="mb-2 font-medium text-[#723e31] dark:text-[#d9b18e]">Trust Score</h4>
        <div className="mb-2 flex justify-between text-sm">
          <span>0%</span>
          <span>100%</span>
        </div>
        <Slider defaultValue={[70]} max={100} step={1} onValueChange={handleTrustScoreChange} className="py-2" />
        <div className="mt-2 text-sm">
          Minimum:
          <Badge variant="outline" className="ml-1 font-mono">
            70%
          </Badge>
        </div>
      </div>

      {/* Verification Flags */}
      <div className="mb-6 space-y-3">
        <h4 className="font-medium text-[#723e31] dark:text-[#d9b18e]">Verification Flags</h4>

        <div className="flex items-center space-x-2">
          <Checkbox id="github" />
          <Label htmlFor="github" className="text-sm">
            GitHub Verified
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="tech-stack" />
          <Label htmlFor="tech-stack" className="text-sm">
            Tech Stack Match
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="linkedin" />
          <Label htmlFor="linkedin" className="text-sm">
            LinkedIn Verified
          </Label>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-6 space-y-3">
        <h4 className="font-medium text-[#723e31] dark:text-[#d9b18e]">Tech Stack</h4>

        {["React", "Node.js", "TypeScript", "Python", "AWS"].map((tech) => (
          <div key={tech} className="flex items-center space-x-2">
            <Checkbox id={tech.toLowerCase()} />
            <Label htmlFor={tech.toLowerCase()} className="text-sm">
              {tech}
            </Label>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-[#a67564] text-[#723e31] hover:bg-[#d9d2cc]/20 dark:border-[#d9b18e] dark:text-[#d9b18e]"
        >
          Reset
        </Button>
        <Button
          size="sm"
          className="flex-1 bg-[#a67564] text-white hover:bg-[#723e31] dark:bg-[#d9b18e] dark:text-gray-900 dark:hover:bg-[#d9b18e]/90"
        >
          Apply
        </Button>
      </div>
    </div>
  )
}
