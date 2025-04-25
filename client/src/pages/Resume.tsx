import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollRevealSection from '@/components/ScrollRevealSection'
import { Link } from 'wouter'
import {
  Download,
  Send,
  Award,
  BookOpen,
  Briefcase,
  Code,
  Cpu,
  GraduationCap,
  Languages,
  Heart,
  ExternalLink,
  User,
  BrainCircuit,
  Sparkles,
  Rocket,
  Layers,
  Database
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const Resume: React.FC = () => {
  const { toast } = useToast()
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const resumeData = {
    name: "MD DELOWAR HOSSAIN",
    title: "Junior Web Developer",
    location: "Dhaka, Bangladesh",
    contact: {
      email: "mdhossain2437@gmail.com",
      phone: "+880 1315 123134",
      linkedin: "linkedin.com/in/mddelowar",
      github: "github.com/delowar"
    },
    summary: "Passionate frontend developer with expertise in React, Next.js, and TypeScript. Creating visually stunning, responsive web applications with clean code and exceptional user experiences. Exploring AI-powered development and LLM integrations.",
    experience: [
      {
        role: "Junior Frontend Developer",
        company: "WebTech Solutions",
        period: "2022 - Present",
        location: "Dhaka, Bangladesh",
        achievements: [
          "Developed responsive web applications using React and Next.js",
          "Implemented modern UI/UX designs with Tailwind CSS and Framer Motion",
          "Integrated third-party APIs and services",
          "Collaborated with design and backend teams"
        ]
      },
      {
        role: "Web Development Intern",
        company: "Innovate Digital",
        period: "2021 - 2022",
        location: "Dhaka, Bangladesh",
        achievements: [
          "Assisted in building responsive web interfaces",
          "Created interactive components using JavaScript",
          "Participated in Agile development processes",
          "Optimized website performance"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Dhaka",
        period: "2018 - 2022",
        location: "Dhaka, Bangladesh",
        achievements: [
          "Specialized in Web Technologies",
          "Participated in coding competitions",
          "Final year project: AI-powered web application"
        ]
      }
    ],
    skills: {
      programming: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Python"],
      frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS"],
      tools: ["Git", "Webpack", "Docker", "Figma", "VS Code"],
      databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
      other: ["REST APIs", "GraphQL", "UI/UX Design", "Responsive Design", "SEO"]
    },
    projects: [
      {
        title: "AI-Powered Portfolio",
        description: "Personal portfolio website with AI-powered chat assistant and interactive UI elements",
        technologies: ["React", "TypeScript", "Framer Motion", "TailwindCSS", "OpenAI API"],
        link: "https://portfolio.delowar.dev"
      },
      {
        title: "E-commerce Platform",
        description: "Full-stack e-commerce application with payment integration and admin dashboard",
        technologies: ["Next.js", "MongoDB", "Stripe", "JWT", "Redux"],
        link: "https://ecom.delowar.dev"
      },
      {
        title: "Task Management System",
        description: "Collaborative task management tool with real-time updates",
        technologies: ["React", "Node.js", "Socket.io", "PostgreSQL", "Docker"],
        link: "https://tasks.delowar.dev"
      }
    ],
    certificates: [
      {
        title: "Advanced React and Redux",
        issuer: "Udemy",
        date: "2023"
      },
      {
        title: "Next.js & React - The Complete Guide",
        issuer: "Academind",
        date: "2022"
      },
      {
        title: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        date: "2021"
      }
    ],
    languages: [
      { name: "Bengali", level: "Native" },
      { name: "English", level: "Professional" },
      { name: "Hindi", level: "Conversational" }
    ]
  }

  const tooltips = {
    download: "Download my professional resume as PDF",
    experience: "My professional journey and roles",
    education: "My academic background",
    skills: "My technical expertise and competencies",
    projects: "Notable projects I've developed",
    certificates: "Professional certifications I've earned",
    languages: "Languages I can communicate in"
  }

  const handleDownload = () => {
    // The actual URL will be filled in later
    const resumeUrl = "/assets/resume.pdf"
    
    // Create temporary link
    const link = document.createElement('a')
    link.href = resumeUrl
    link.setAttribute('download', 'MD_Delowar_Hossain_Resume.pdf')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Show success toast
    toast({
      title: "Resume download started",
      description: "Thank you for your interest in my profile!"
    })
  }

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* AI Assistant Character - Visible at bottom right */}
      <div className="fixed bottom-4 right-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <button 
            className="w-12 h-12 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center text-white shadow-glow"
            onClick={() => toast({
              title: "AI Assistant",
              description: "Hi there! Hover over different sections to learn more about me, or click the download button to get my resume!",
            })}
          >
            <BrainCircuit className="w-6 h-6" />
          </button>
          
          <motion.div 
            className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>
      </div>
      
      {/* Hero section */}
      <ScrollRevealSection>
        <div className="min-h-[40vh] flex items-center justify-center relative pt-24 pb-12 px-4 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03] z-0"></div>
            <motion.div 
              className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"
              animate={{ 
                x: [0, 10, 0], 
                y: [0, 15, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8,
                ease: "easeInOut" 
              }}
            ></motion.div>
            <motion.div 
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"
              animate={{ 
                x: [0, -20, 0], 
                y: [0, 20, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 10,
                ease: "easeInOut" 
              }}
            ></motion.div>
          </div>
          
          <div className="relative z-10 max-w-4xl w-full">
            <div className="text-center">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <h1 className="font-space text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 glow-text">
                  {resumeData.name}
                </h1>
                <h2 className="text-xl md:text-2xl font-medium mb-4">
                  <span className="text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
                    {resumeData.title}
                  </span>
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto text-lg">
                  {resumeData.location} • {resumeData.contact.email} • {resumeData.contact.phone}
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 mb-4"
              >
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/">
                    <motion.a 
                      className="px-5 py-2.5 bg-dark-800 border border-primary/20 rounded-lg text-white/90 flex items-center gap-2 hover:bg-primary/10 transition-all"
                      whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(182, 46, 177, 0.3)' }}
                      whileTap={{ y: 0 }}
                    >
                      <ExternalLink className="w-4 h-4 text-primary" />
                      Back to Portfolio
                    </motion.a>
                  </Link>
                  
                  <motion.button 
                    className="px-5 py-2.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg flex items-center gap-2 shadow-glow hover:shadow-glow-lg transition-all"
                    whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(182, 46, 177, 0.4)' }}
                    whileTap={{ y: 0 }}
                    onClick={handleDownload}
                    onMouseEnter={() => setShowTooltip('download')}
                    onMouseLeave={() => setShowTooltip(null)}
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                      {showTooltip === 'download' && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-dark-800/90 backdrop-blur-sm text-white text-xs rounded-lg border border-primary/20 whitespace-nowrap z-50"
                        >
                          {tooltips.download}
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-dark-800/90 border-r border-b border-primary/20 rotate-45"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>
      
      {/* Summary section */}
      <ScrollRevealSection>
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="glass p-6 sm:p-8 rounded-2xl border border-primary/20">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              PROFESSIONAL SUMMARY
            </h2>
            
            <p className="text-white/80 leading-relaxed">
              {resumeData.summary}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.span 
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-dark-800/70 text-white/70 text-sm rounded-full"
                whileHover={{ y: -2, backgroundColor: 'rgba(182, 46, 177, 0.2)' }}
              >
                <Code className="w-3.5 h-3.5" />
                Frontend Developer
              </motion.span>
              
              <motion.span 
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-dark-800/70 text-white/70 text-sm rounded-full"
                whileHover={{ y: -2, backgroundColor: 'rgba(182, 46, 177, 0.2)' }}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                AI Enthusiast
              </motion.span>
              
              <motion.span 
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-dark-800/70 text-white/70 text-sm rounded-full"
                whileHover={{ y: -2, backgroundColor: 'rgba(182, 46, 177, 0.2)' }}
              >
                <Rocket className="w-3.5 h-3.5" />
                Continuous Learner
              </motion.span>
              
              <motion.span 
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-dark-800/70 text-white/70 text-sm rounded-full"
                whileHover={{ y: -2, backgroundColor: 'rgba(182, 46, 177, 0.2)' }}
              >
                <Heart className="w-3.5 h-3.5" />
                UI/UX Passionate
              </motion.span>
            </div>
          </div>
        </div>
      </ScrollRevealSection>
      
      {/* Two-column layout for Experience and Education */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 mb-12">
        {/* Experience section */}
        <ScrollRevealSection direction="left">
          <div 
            className="relative glass p-6 sm:p-8 rounded-2xl border border-primary/20 h-full"
            onMouseEnter={() => setShowTooltip('experience')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="absolute -top-3 -left-3 p-2 bg-dark-900 rounded-full border border-primary/30">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            
            <h2 className="text-lg md:text-xl font-bold mb-6 text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              EXPERIENCE
            </h2>
            
            {resumeData.experience.map((exp, index) => (
              <div key={index} className={`${index !== resumeData.experience.length - 1 ? 'mb-6 pb-6 border-b border-dark-700/50' : ''}`}>
                <h3 className="text-white font-medium text-lg">{exp.role}</h3>
                <p className="text-primary/90 mb-1.5">{exp.company} | {exp.period}</p>
                <p className="text-white/50 text-sm mb-3">{exp.location}</p>
                
                <ul className="space-y-1.5">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip === 'experience' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -bottom-3 right-4 px-3 py-2 bg-dark-800/90 backdrop-blur-sm text-white text-xs rounded-lg border border-primary/20 whitespace-nowrap z-10"
                >
                  {tooltips.experience}
                  <div className="absolute -top-1 right-8 transform -translate-x-1/2 w-2 h-2 bg-dark-800/90 border-l border-t border-primary/20 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollRevealSection>
        
        {/* Education section */}
        <ScrollRevealSection direction="right">
          <div 
            className="relative glass p-6 sm:p-8 rounded-2xl border border-primary/20 h-full"
            onMouseEnter={() => setShowTooltip('education')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="absolute -top-3 -left-3 p-2 bg-dark-900 rounded-full border border-primary/30">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            
            <h2 className="text-lg md:text-xl font-bold mb-6 text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              EDUCATION
            </h2>
            
            {resumeData.education.map((edu, index) => (
              <div key={index} className={`${index !== resumeData.education.length - 1 ? 'mb-6 pb-6 border-b border-dark-700/50' : ''}`}>
                <h3 className="text-white font-medium text-lg">{edu.degree}</h3>
                <p className="text-primary/90 mb-1.5">{edu.institution} | {edu.period}</p>
                <p className="text-white/50 text-sm mb-3">{edu.location}</p>
                
                <ul className="space-y-1.5">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Certificates section */}
            <div className="mt-8">
              <h3 className="text-white font-medium text-base mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                Certifications
              </h3>
              
              <ul className="space-y-3">
                {resumeData.certificates.map((cert, index) => (
                  <li key={index} className="text-white/70 text-sm">
                    <span className="text-white">{cert.title}</span>
                    <p className="text-primary/70">{cert.issuer} | {cert.date}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip === 'education' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -bottom-3 right-4 px-3 py-2 bg-dark-800/90 backdrop-blur-sm text-white text-xs rounded-lg border border-primary/20 whitespace-nowrap z-10"
                >
                  {tooltips.education}
                  <div className="absolute -top-1 right-8 transform -translate-x-1/2 w-2 h-2 bg-dark-800/90 border-l border-t border-primary/20 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollRevealSection>
      </div>
      
      {/* Skills section */}
      <ScrollRevealSection>
        <div 
          className="max-w-4xl mx-auto px-4 mb-12"
          onMouseEnter={() => setShowTooltip('skills')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <div className="glass p-6 sm:p-8 rounded-2xl border border-primary/20 relative">
            <div className="absolute -top-3 -left-3 p-2 bg-dark-900 rounded-full border border-primary/30">
              <Code className="w-5 h-5 text-primary" />
            </div>
            
            <h2 className="text-lg md:text-xl font-bold mb-6 text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              TECHNICAL SKILLS
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-white font-medium text-base mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  Programming Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.programming.map((skill, i) => (
                    <motion.span 
                      key={i}
                      className="px-3 py-1 bg-dark-800/70 text-white/70 text-sm rounded-full"
                      whileHover={{ y: -2, backgroundColor: 'rgba(182, 46, 177, 0.2)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium text-base mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Frameworks & Libraries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.frameworks.map((skill, i) => (
                    <motion.span 
                      key={i}
                      className="px-3 py-1 bg-dark-800/70 text-white/70 text-sm rounded-full"
                      whileHover={{ y: -2, backgroundColor: 'rgba(182, 46, 177, 0.2)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium text-base mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  Databases
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.databases.map((skill, i) => (
                    <motion.span 
                      key={i}
                      className="px-3 py-1 bg-dark-800/70 text-white/70 text-sm rounded-full"
                      whileHover={{ y: -2, backgroundColor: 'rgba(182, 46, 177, 0.2)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium text-base mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  Tools & Environments
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.tools.map((skill, i) => (
                    <motion.span 
                      key={i}
                      className="px-3 py-1 bg-dark-800/70 text-white/70 text-sm rounded-full"
                      whileHover={{ y: -2, backgroundColor: 'rgba(182, 46, 177, 0.2)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium text-base mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Other Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.other.map((skill, i) => (
                    <motion.span 
                      key={i}
                      className="px-3 py-1 bg-dark-800/70 text-white/70 text-sm rounded-full"
                      whileHover={{ y: -2, backgroundColor: 'rgba(182, 46, 177, 0.2)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-medium text-base mb-3 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-primary" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.languages.map((lang, i) => (
                    <motion.span 
                      key={i}
                      className="px-3 py-1 bg-dark-800/70 text-white/70 text-sm rounded-full"
                      whileHover={{ y: -2, backgroundColor: 'rgba(182, 46, 177, 0.2)' }}
                    >
                      {lang.name} ({lang.level})
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip === 'skills' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -bottom-3 right-4 px-3 py-2 bg-dark-800/90 backdrop-blur-sm text-white text-xs rounded-lg border border-primary/20 whitespace-nowrap z-10"
                >
                  {tooltips.skills}
                  <div className="absolute -top-1 right-8 transform -translate-x-1/2 w-2 h-2 bg-dark-800/90 border-l border-t border-primary/20 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollRevealSection>
      
      {/* Projects section */}
      <ScrollRevealSection>
        <div 
          className="max-w-4xl mx-auto px-4 mb-12"
          onMouseEnter={() => setShowTooltip('projects')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          <div className="glass p-6 sm:p-8 rounded-2xl border border-primary/20 relative">
            <div className="absolute -top-3 -left-3 p-2 bg-dark-900 rounded-full border border-primary/30">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            
            <h2 className="text-lg md:text-xl font-bold mb-6 text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              NOTABLE PROJECTS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.projects.map((project, index) => (
                <motion.div 
                  key={index}
                  className="glass p-5 rounded-xl border border-primary/10 h-full"
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(182, 46, 177, 0.2)' }}
                >
                  <h3 className="text-white font-medium text-lg mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 bg-dark-800/80 text-white/60 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary text-sm hover:text-primary/80 transition-colors"
                  >
                    View Project <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              ))}
            </div>
            
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip === 'projects' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -bottom-3 right-4 px-3 py-2 bg-dark-800/90 backdrop-blur-sm text-white text-xs rounded-lg border border-primary/20 whitespace-nowrap z-10"
                >
                  {tooltips.projects}
                  <div className="absolute -top-1 right-8 transform -translate-x-1/2 w-2 h-2 bg-dark-800/90 border-l border-t border-primary/20 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollRevealSection>
      
      {/* Contact section with download button */}
      <ScrollRevealSection>
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="glass p-6 sm:p-8 rounded-2xl border border-primary/20 text-center">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              LET'S CONNECT
            </h2>
            
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              I'm currently open to new opportunities and collaborations. Feel free to reach out if you're interested in working together!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <motion.a 
                href={`mailto:${resumeData.contact.email}`}
                className="px-4 py-2 bg-dark-800 border border-primary/20 rounded-lg text-white/90 flex items-center gap-2 hover:bg-primary/10 transition-all"
                whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(182, 46, 177, 0.3)' }}
                whileTap={{ y: 0 }}
              >
                <Send className="w-4 h-4 text-primary" />
                Send Email
              </motion.a>
              
              <motion.a 
                href={`https://${resumeData.contact.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-dark-800 border border-primary/20 rounded-lg text-white/90 flex items-center gap-2 hover:bg-primary/10 transition-all"
                whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(182, 46, 177, 0.3)' }}
                whileTap={{ y: 0 }}
              >
                <User className="w-4 h-4 text-primary" />
                LinkedIn
              </motion.a>
              
              <motion.a 
                href={`https://${resumeData.contact.github}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-dark-800 border border-primary/20 rounded-lg text-white/90 flex items-center gap-2 hover:bg-primary/10 transition-all"
                whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(182, 46, 177, 0.3)' }}
                whileTap={{ y: 0 }}
              >
                <Code className="w-4 h-4 text-primary" />
                GitHub
              </motion.a>
            </div>
            
            <motion.button 
              className="px-5 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg flex items-center gap-2 shadow-glow mx-auto hover:shadow-glow-lg transition-all"
              whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(182, 46, 177, 0.4)' }}
              whileTap={{ y: 0 }}
              onClick={handleDownload}
            >
              <Download className="w-5 h-5" />
              Download Complete CV
            </motion.button>
          </div>
        </div>
      </ScrollRevealSection>
      
      {/* Footer */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-white/50 text-sm">
          © {new Date().getFullYear()} MD Delowar Hossain. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Resume