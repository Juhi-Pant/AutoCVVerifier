// LandingPage.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/resume.jpg';

export default function LandingPage() {
  const navigate = useNavigate();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a192f] to-[#172a45] text-white font-sans">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#64ffda]/10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <motion.header 
        className="fixed w-full z-50 px-6 py-4 bg-[#0a192f]/90 backdrop-blur-md shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-[#64ffda] rounded-full flex items-center justify-center cursor-pointer"  onClick={() => navigate('/')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0a192f]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-[#64ffda]">SkillVeritas</h1>
          </motion.div>
          
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-transparent border-2 border-[#64ffda] text-[#64ffda] rounded-md font-medium hover:bg-[#64ffda]/10 transition-colors duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(100, 255, 218, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Try Now
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0"
            initial="hidden"
            animate="show"
            variants={container}
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={item}
            >
              <span className="text-[#64ffda]">Verify</span> Candidate Skills <br />
              with Confidence
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-[#ccd6f6] mb-8 max-w-xl"
              variants={item}
            >
              SkillVeritas analyzes GitHub projects in resumes to validate real technical skills, enabling faster shortlisting and reducing hiring risks.
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={item}>
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="px-8 py-3 bg-[#64ffda] text-[#0a192f] rounded-md font-semibold hover:bg-[#64ffda]/90 transition-colors duration-300"
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(100, 255, 218, 0.7)" }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="px-8 py-3 border-2 border-[#64ffda] text-[#64ffda] rounded-md font-semibold hover:bg-[#64ffda]/10 transition-colors duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src={heroImg}
                alt="Resume Verification"
                className="w-full max-w-xl rounded-lg shadow-2xl z-10 relative"
              />
              <motion.div 
                className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#64ffda] rounded-lg"
                initial={{ opacity: 0, x: 50, y: 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 px-6 bg-[#0a192f]">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-[#64ffda]">Recruitment Challenges</span> We Solve
            </h3>
            <div className="w-20 h-1 bg-[#64ffda] mx-auto mt-4"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true }}
          >
            <ProblemCard 
              icon="📄" 
              title="Skill Misrepresentation" 
              description="Candidates often list skills they don't actually use. SkillVeritas verifies skills through real GitHub contributions, ensuring authenticity." 
            />
            <ProblemCard 
              icon="🔗" 
              title="Time-Consuming Screening" 
              description=" Manually reviewing resumes and portfolios is slow. Our platform automates technical validation, accelerating candidate shortlisting." 
            />
            <ProblemCard 
              icon="🤥" 
              title="Lack of Proof of Work"
              description="Traditional resumes don’t show real-world project impact. SkillVeritas bridges this gap by analyzing live repositories for practical skill evidence." 
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#172a45]">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Powerful <span className="text-[#64ffda]">Features</span>
            </h3>
            <p className="text-[#ccd6f6] max-w-2xl mx-auto">
              SkillVeritas provides comprehensive tools to validate candidate skills and streamline your hiring process.
            </p>
            <div className="w-20 h-1 bg-[#64ffda] mx-auto mt-4"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true }}
          >
            <FeatureCard 
              title="GitHub Skill Verification" 
              description="Analyzes linked GitHub repos to validate claimed technical skills." 
              icon="✅"
            />
            <FeatureCard 
              title="Automated Resume Parsing" 
              description="Extracts GitHub links and keywords from uploaded resumes instantly." 
              icon="🔍"
            />
            <FeatureCard 
              title="Match Score Calculation" 
              description="Generates a skill match percentage based on recruiter-defined requirements." 
              icon="📊"
            />
            <FeatureCard 
              title="Project-Based Proof" 
              description="Highlights skills demonstrated through real, live code contributions." 
              icon="⚠️"
            />
            <FeatureCard 
              title="Repo Health Checks" 
              description="Evaluates repositories for activity, originality, and license compliance." 
              icon="⏳"
            />
            <FeatureCard 
              title="Candidate Ranking" 
              description="Automatically sorts candidates by relevance and skill alignment." 
              icon="👥"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-[#0a192f]">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              How <span className="text-[#64ffda]">It Works</span>
            </h3>
            <div className="w-20 h-1 bg-[#64ffda] mx-auto mt-4"></div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col lg:flex-row gap-8 items-center"
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true }}
          >
            <WorkStep 
              number="1" 
              title="Upload Resume" 
              description="Submit candidate resumes in PDF format to begin analysis." 
            />
            <div className="hidden lg:block text-[#64ffda] text-4xl">→</div>
            <WorkStep 
              number="2" 
              title="Set Required Skills" 
              description="Enter the technical skills you're hiring for." 
            />
            <div className="hidden lg:block text-[#64ffda] text-4xl">→</div>
            <WorkStep 
              number="3" 
              title="Get Ranked Results" 
              description="View skill-matched candidates with GitHub-backed proof and scores." 
            />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-[#172a45]">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              What <span className="text-[#64ffda]">Recruiters Say</span>
            </h3>
            <div className="w-20 h-1 bg-[#64ffda] mx-auto mt-4"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true }}
          >
            <TestimonialCard 
              quote="SkillVeritas Lorem ipsum dolor sit amet, consectetur adipiscing elit sed." 
              author="Sarah K., Tech Recruiter" 
              role="Hiring Manager at XYZ" 
            />
            <TestimonialCard 
              quote="SkillVeritas Lorem ipsum dolor sit amet, consectetur adipiscing elit sed." 
              author="Michael T." 
              role="CTO at StartupX" 
            />
            <TestimonialCard 
              quote="SkillVeritas Lorem ipsum dolor sit amet, consectetur adipiscing elit sed." 
              author="Priya M." 
              role="Lead Recruiter at XYZ" 
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#0a192f] to-[#172a45]">
        <motion.div 
          className="container mx-auto text-center bg-[#0a192f]/50 p-12 rounded-xl border border-[#64ffda]/20 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#64ffda]/10 blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#64ffda]/10 blur-xl"></div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to <span className="text-[#64ffda]">Transform</span> Your Hiring Process?
          </h3>
          <p className="text-[#ccd6f6] max-w-2xl mx-auto mb-8">
            Join hundreds of recruiters who trust SkillVeritas for accurate technical candidate evaluation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-[#64ffda] text-[#0a192f] rounded-md font-semibold hover:bg-[#64ffda]/90 transition-colors duration-300"
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(100, 255, 218, 0.7)" }}
              whileTap={{ scale: 0.98 }}
            >
              Start Free Trial
            </motion.button>
            <motion.button
              className="px-8 py-3 border-2 border-[#64ffda] text-[#64ffda] rounded-md font-semibold hover:bg-[#64ffda]/10 transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0a192f]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="flex items-center space-x-2 mb-6 md:mb-0"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-[#64ffda] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#0a192f]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-[#64ffda]">SkillVeritas</h1>
            </motion.div>
            
            <div className="flex space-x-6 mb-6 md:mb-0">
              <motion.a 
                href="#" 
                className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Terms
              </motion.a>
              <motion.a 
                href="https://github.com/Juhi-Pant/AutoCVVerifier" 
                target="_blank"
                className="text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                GitHub
              </motion.a>
            </div>
            
            <div className="flex space-x-4">
              <motion.a 
                href="https://github.com/Juhi-Pant" 
                target="_blank"
                className="w-10 h-10 rounded-full bg-[#112240] flex items-center justify-center text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300"
                whileHover={{ y: -3, backgroundColor: "#1f2d48" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/juhi-pant-6b192b16b/" 
                target="_blank"
                className="w-10 h-10 rounded-full bg-[#112240] flex items-center justify-center text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300"
                whileHover={{ y: -3, backgroundColor: "#1f2d48" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </motion.a>
              <motion.a 
                href="mailto:pantjuhi2009@gmail.com" 
                className="w-10 h-10 rounded-full bg-[#112240] flex items-center justify-center text-[#ccd6f6] hover:text-[#64ffda] transition-colors duration-300"
                whileHover={{ y: -3, backgroundColor: "#1f2d48" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </motion.a>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-[#1f2d48] text-center text-[#8892b0] text-sm">
            <p>Built with ❤️ by <span className="text-[#64ffda]">Juhi Pant</span></p>
            <p className="mt-2">© {new Date().getFullYear()} SkillVeritas. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component for Problem Cards
function ProblemCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-[#112240] p-8 rounded-lg shadow-lg border border-[#1f2d48] hover:border-[#64ffda]/30 transition-colors duration-300"
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-3 text-[#ccd6f6]">{title}</h4>
      <p className="text-[#8892b0]">{description}</p>
    </motion.div>
  );
}

// Component for Feature Cards
function FeatureCard({ icon, title, description }) {
  return (
    <motion.div 
      className="bg-[#112240] p-8 rounded-lg shadow-lg border border-[#1f2d48] hover:border-[#64ffda]/30 transition-colors duration-300"
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
    >
      <div className="text-2xl mb-4 text-[#64ffda]">{icon}</div>
      <h4 className="text-xl font-semibold mb-3 text-[#ccd6f6]">{title}</h4>
      <p className="text-[#8892b0]">{description}</p>
    </motion.div>
  );
}

// Component for Work Steps
function WorkStep({ number, title, description }) {
  return (
    <motion.div 
      className="flex-1 bg-[#112240] p-8 rounded-lg text-center"
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 }
      }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-16 h-16 bg-[#64ffda] rounded-full flex items-center justify-center text-[#0a192f] text-2xl font-bold mx-auto mb-6">
        {number}
      </div>
      <h4 className="text-xl font-semibold mb-3 text-[#ccd6f6]">{title}</h4>
      <p className="text-[#8892b0]">{description}</p>
    </motion.div>
  );
}

// Component for Testimonials
function TestimonialCard({ quote, author, role }) {
  return (
    <motion.div 
      className="bg-[#112240] p-8 rounded-lg shadow-lg border border-[#1f2d48]"
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
    >
      <svg className="w-8 h-8 text-[#64ffda] mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-[#ccd6f6] italic mb-6">"{quote}"</p>
      <div>
        <p className="font-semibold text-[#64ffda]">{author}</p>
        <p className="text-sm text-[#8892b0]">{role}</p>
      </div>
    </motion.div>
  );
}