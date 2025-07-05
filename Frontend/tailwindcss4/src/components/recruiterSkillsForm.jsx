"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { motion } from "framer-motion";
import { Filter, Trash2 } from "lucide-react";

export default function RecruiterFilterSection({ sessionId, onResults, isVerified }) {
  if (!isVerified) return null;

  const knownSkills = [
    "React", "Node.js", "Express", "MongoDB", "JavaScript", "TypeScript",
    "Next.js", "Python", "Django", "Flask", "Java", "C++", "HTML", "CSS",
    "SQL", "NoSQL", "Tailwind", "Docker", "Kubernetes", "AWS", "GCP", "Azure"
  ];

  const [requiredSkills, setRequiredSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const addSkill = (skill = inputSkill.trim()) => {
    if (skill && !requiredSkills.includes(skill)) {
      setRequiredSkills(prev => [...prev, skill]);
      setInputSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setRequiredSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  const handleFilter = async () => {
    if (!requiredSkills.length) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/filter-candidates", {
        skills: requiredSkills,
        sessionId,
      });
      onResults(response.data, requiredSkills);
    } catch (err) {
      console.error("Filtering failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredSuggestions = inputSkill.length
    ? knownSkills.filter(skill =>
        skill.toLowerCase().includes(inputSkill.toLowerCase()) &&
        !requiredSkills.includes(skill)
      )
    : [];

  return (
    <motion.div
      className="bg-[#112240] border border-[#1f2d48] rounded-xl p-6 space-y-4 mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center gap-3">
        <Filter className="text-[#64ffda]" />
        <h3 className="text-lg font-semibold text-[#ccd6f6]">Filter Candidates by Verified Skills</h3>
      </div>

      <div className="relative w-fit flex flex-col gap-1">
        <div className="flex gap-3 flex-wrap">
          <Input
            placeholder="Enter required skill (e.g., React)"
            className="w-64 bg-[#0a192f] border-[#1f2d48] text-[#ccd6f6] placeholder:text-[#8892b0]"
            value={inputSkill}
            onChange={(e) => setInputSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button
            variant="secondary"
            onClick={() => addSkill()}
            className="bg-[#0a192f] text-[#64ffda] border border-[#64ffda]/30 hover:bg-[#1f2d48]"
          >
            Add Skill
          </Button>
        </div>

        {filteredSuggestions.length > 0 && (
          <ul className="absolute top-[3.2rem] z-10 w-64 bg-[#0a192f] border border-[#1f2d48] rounded-md shadow-md text-[#ccd6f6] max-h-40 overflow-y-auto">
            {filteredSuggestions.map((skill, idx) => (
              <li
                key={idx}
                className="px-3 py-2 hover:bg-[#1f2d48] cursor-pointer"
                onClick={() => addSkill(skill)}
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
      </div>

      {requiredSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {requiredSkills.map((skill) => (
            <Badge
              key={skill}
              className="bg-[#0a192f] border border-[#64ffda]/30 text-[#64ffda] flex items-center gap-1 px-2 py-1"
            >
              {skill}
              <Trash2
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeSkill(skill)}
              />
            </Badge>
          ))}
        </div>
      )}

      <Button
        onClick={handleFilter}
        disabled={loading || !requiredSkills.length || !isVerified}
        className={`bg-[#64ffda] text-[#0a192f] hover:bg-[#52e0c4] transition-all ${
          (!requiredSkills.length || !isVerified) ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Filtering..." : "Filter Candidates"}
      </Button>
    </motion.div>
  );
}
