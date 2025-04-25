import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Terminal, User, Bot, Code, FileCode, Github, Zap, Monitor, Braces, Server, Database, CheckCircle2, Layers, Star } from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import Typed from 'typed.js'

const ChatSkills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [isTyping, setIsTyping] = useState(false)
  const [showFirstResponse, setShowFirstResponse] = useState(false)
  const [showSecondQuestion, setShowSecondQuestion] = useState(false)
  const [showSecondResponse, setShowSecondResponse] = useState(false)
  const [showCodeGenerator, setShowCodeGenerator] = useState(false)
  const typedRef = useRef<HTMLDivElement>(null)
  const typedInstance = useRef<Typed | null>(null)
  const codeExampleRef = useRef<HTMLPreElement>(null)
  const codeTyped = useRef<Typed | null>(null)
  
  // Auto-animate when component mounts for better user experience
  useEffect(() => {
    const startAnimations = () => {
      const timer1 = setTimeout(() => setShowFirstResponse(true), 800)
      const timer2 = setTimeout(() => setShowSecondQuestion(true), 2000)
      const timer3 = setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          setShowSecondResponse(true)
        }, 1200)
      }, 3000)

      const timer4 = setTimeout(() => {
        setShowCodeGenerator(true)
      }, 4500)
      
      return { timer1, timer2, timer3, timer4 }
    }
    
    const timers = startAnimations()
    
    // Initialize Typed.js for animated typing at the bottom command prompt
    if (typedRef.current) {
      typedInstance.current = new Typed(typedRef.current, {
        strings: [
          'delowar.hire()',
          'delowar.getSkills()',
          'delowar.contactMe()',
          'delowar.startProject({frontend: true, responsive: true})'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
        autoInsertCss: true
      })
    }
    
    return () => {
      clearTimeout(timers.timer1)
      clearTimeout(timers.timer2)
      clearTimeout(timers.timer3)
      clearTimeout(timers.timer4)
      
      if (typedInstance.current) {
        typedInstance.current.destroy()
      }
      
      if (codeTyped.current) {
        codeTyped.current.destroy()
      }
    }
  }, []) // Removed inView dependency to make it visible on initial render

  // Initialize code example animation
  useEffect(() => {
    if (showCodeGenerator && codeExampleRef.current) {
      const reactCode = `// Modern React component with TypeScript and Tailwind
import React, { useState, useEffect } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  isLoading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  isLoading = false
}) => {
  // Dynamic classes based on props
  const baseClasses = "rounded-md font-medium transition-all";
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  const variantClasses = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-50"
  };
  
  return (
    <button
      className={\`\${baseClasses} \${sizeClasses[size]} \${variantClasses[variant]}\`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : children}
    </button>
  );
};`;

      setTimeout(() => {
        codeTyped.current = new Typed(codeExampleRef.current, {
          strings: [reactCode],
          typeSpeed: 5,
          showCursor: true,
          cursorChar: '▮',
          onComplete: () => {
            // Nothing needed here, we'll leave the code displayed
          }
        });
      }, 300);
    }
  }, [showCodeGenerator]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20,
        duration: 0.5 
      }
    }
  }

  const frontendSkills = `{
  "frontendDevelopment": {
    "languages": ["HTML", "CSS", "JavaScript (ES6+)", "TypeScript"],
    "frameworks": ["React.js", "Next.js", "Vue.js"],
    "styling": ["Tailwind CSS", "Styled Components", "SCSS"]
  },
  "developerTools": {
    "versionControl": ["Git", "GitHub", "GitLab"],
    "editors": ["VS Code", "WebStorm"],
    "debugging": ["Chrome DevTools", "React DevTools"]
  },
  "testing": {
    "frameworks": ["Jest", "React Testing Library", "Cypress"]
  },
  "integration": {
    "api": ["REST API", "GraphQL", "WebSockets"]
  },
  "skills": [
    "Responsive Design",
    "Cross-Browser Compatibility",
    "Problem-Solving",
    "Performance Optimization",
    "Accessibility (WCAG)"
  ]
}`

  const devAttributes = `function devAttributes() {
  return {
    // Problem-solving approach
    problemSolving: {
      analyticalMindset: true,
      debuggingSkills: "Advanced",
      solutionOriented: "Always seeking the optimal approach"
    },
    
    // Learning mindset
    continuousLearning: {
      technicalArticles: "Regular reader",
      courses: "Constantly taking new courses to improve skills",
      communityEngagement: "Active in developer communities"
    },
    
    // Collaboration
    teamwork: {
      communicationStyle: "Clear and concise",
      feedback: "Open to constructive criticism",
      pairProgramming: "Experienced and effective"
    },
    
    // Soft skills
    softSkills: {
      communication: "Excellent written and verbal skills",
      timeManagement: "Efficient at prioritizing tasks",
      problemSolving: "Creative approach to technical challenges",
      adaptability: "Quick to learn new technologies and frameworks"
    }
  };
}`

  // Pulse animation for code
  const pulseAnimation = {
    scale: [1, 1.02, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
  
  // More advanced skill icons with tooltip-like info
  const skillIcons = [
    { 
      icon: <FileCode className="w-5 h-5" />, 
      label: "HTML/CSS", 
      color: "from-orange-500 to-red-500",
      level: 95 
    },
    { 
      icon: <Braces className="w-5 h-5" />, 
      label: "JavaScript", 
      color: "from-yellow-400 to-yellow-600",
      level: 90 
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      label: "React", 
      color: "from-primary to-cyan-500",
      level: 92 
    },
    { 
      icon: <Layers className="w-5 h-5" />, 
      label: "Tailwind", 
      color: "from-cyan-400 to-blue-500",
      level: 95 
    },
    { 
      icon: <Server className="w-5 h-5" />, 
      label: "Node.js", 
      color: "from-green-500 to-teal-600",
      level: 85 
    },
    { 
      icon: <Database className="w-5 h-5" />, 
      label: "MongoDB", 
      color: "from-emerald-500 to-green-600",
      level: 80 
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      label: "Git/GitHub", 
      color: "from-gray-500 to-gray-700",
      level: 90 
    },
    { 
      icon: <Monitor className="w-5 h-5" />, 
      label: "Responsive", 
      color: "from-pink-500 to-rose-600",
      level: 95 
    }
  ]

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 -left-20 w-72 h-72 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <motion.div 
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-primary/10 backdrop-blur-sm p-2 rounded-full inline-block shadow-glow">
                <Code className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </motion.div>
            
            <motion.h2 
              className="font-space text-3xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              My Tech <span className="text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">Expertise</span>
            </motion.h2>
            
            <motion.p 
              className="text-white/70 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Explore my technical skills and proficiencies in a conversational format.
            </motion.p>
          </motion.div>
          
          {/* Skill meters - new advanced feature */}
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {skillIcons.map((skill, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="glass p-4 rounded-xl border border-primary/10 relative overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-10 z-0" style={{
                    background: `linear-gradient(to bottom right, var(--${skill.color.split(' ')[0].slice(5)}), var(--${skill.color.split(' ')[1].slice(3)}))`
                  }}></div>
                  
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center text-white`}>
                        {skill.icon}
                      </div>
                      <span className="font-medium text-white">{skill.label}</span>
                    </div>
                    <div className="text-white/80 font-medium">{skill.level}%</div>
                  </div>
                  
                  <div className="h-2 w-full bg-dark-700 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: 'easeOut' }}
                    />
                  </div>
                  
                  {/* Hidden tooltip that appears on hover */}
                  <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
                    <Star className="w-5 h-5 text-yellow-400 mb-1" />
                    <div className="text-xs text-center text-white/90 font-medium">
                      {skill.level >= 90 ? 'Expert Level' : skill.level >= 80 ? 'Advanced Level' : 'Intermediate Level'}
                    </div>
                    <div className="text-[10px] text-center text-white/60 mt-1">
                      {skill.level >= 90 ? 'Mastered all advanced concepts' : skill.level >= 80 ? 'Strong practical knowledge' : 'Solid working knowledge'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <Tilt
            tiltMaxAngleX={2}
            tiltMaxAngleY={2}
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#6d28d9"
            glarePosition="all"
            glareBorderRadius="12px"
            perspective={1000}
            scale={1.01}
            className="mb-12"
          >
            <motion.div 
              className="glass p-6 md:p-8 rounded-2xl border border-primary/20 relative shadow-glow"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Background grid pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-2xl"></div>
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>
                  <div className="text-white/70 text-xs font-code hidden sm:block">delowar_skills.ts</div>
                </div>
                <div className="glass-card py-1 px-3 rounded-full flex items-center space-x-2 text-white/60 text-sm">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="font-code text-xs">AI Chat <span className="animate-pulse">▮</span></span>
                </div>
              </div>
              
              <div className="space-y-6 font-code overflow-hidden">
                {/* User question */}
                <motion.div 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <div className="w-10 h-10 rounded-full bg-dark-700 flex-shrink-0 flex items-center justify-center">
                    <User className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="ml-4 glass-card p-4 rounded-2xl rounded-tl-none max-w-full sm:max-w-[80%] border border-white/10">
                    <p className="text-white/90 text-sm">What do you specialize in?</p>
                  </div>
                </motion.div>
                
                {/* AI response */}
                <AnimatePresence>
                  {showFirstResponse && (
                    <motion.div 
                      className="flex items-start justify-end"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.div 
                        className="mr-4 bg-primary/10 border border-primary/30 p-4 rounded-2xl rounded-tr-none max-w-full sm:max-w-[80%] shadow-lg"
                        animate={pulseAnimation}
                      >
                        <div className="flex justify-between items-center mb-2 text-xs text-white/60">
                          <span className="flex items-center">
                            <Code className="w-3 h-3 mr-1" />
                            skills.json
                          </span>
                          <span className="flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                            verified
                          </span>
                        </div>
                        <pre className="text-white/90 text-xs sm:text-sm whitespace-pre-wrap overflow-x-auto font-code">{frontendSkills}</pre>
                      </motion.div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0 flex items-center justify-center shadow-glow">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* User second question */}
                <AnimatePresence>
                  {showSecondQuestion && (
                    <motion.div 
                      className="flex items-start"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="w-10 h-10 rounded-full bg-dark-700 flex-shrink-0 flex items-center justify-center">
                        <User className="w-5 h-5 text-white/70" />
                      </div>
                      <div className="ml-4 glass-card p-4 rounded-2xl rounded-tl-none max-w-full sm:max-w-[80%] border border-white/10">
                        <p className="text-white/90 text-sm">What makes you stand out from other developers?</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* AI second response */}
                <AnimatePresence>
                  {showSecondResponse && (
                    <motion.div 
                      className="flex items-start justify-end"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.div 
                        className="mr-4 bg-primary/10 border border-primary/30 p-4 rounded-2xl rounded-tr-none max-w-full sm:max-w-[80%] shadow-lg"
                        animate={pulseAnimation}
                      >
                        <div className="flex justify-between items-center mb-2 text-xs text-white/60">
                          <span className="flex items-center">
                            <Code className="w-3 h-3 mr-1" />
                            developer_profile.js
                          </span>
                          <span className="flex items-center">
                            <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                            verified
                          </span>
                        </div>
                        <pre className="text-white/90 text-xs sm:text-sm whitespace-pre-wrap overflow-x-auto font-code">{devAttributes}</pre>
                      </motion.div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0 flex items-center justify-center shadow-glow">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Auto-generated code example */}
                <AnimatePresence>
                  {showCodeGenerator && (
                    <motion.div 
                      className="flex items-start justify-end"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.div 
                        className="mr-4 bg-primary/10 border border-primary/30 p-4 rounded-2xl rounded-tr-none max-w-full shadow-lg w-full"
                        animate={pulseAnimation}
                      >
                        <div className="flex justify-between items-center mb-2 text-xs text-white/60">
                          <span className="flex items-center">
                            <Zap className="w-3 h-3 mr-1 text-yellow-400" />
                            auto-generated component
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full">React</span>
                            <span className="bg-cyan-500/20 text-cyan-500 text-[10px] px-2 py-0.5 rounded-full">TypeScript</span>
                          </div>
                        </div>
                        <div className="bg-dark-900/50 rounded-lg p-3 overflow-x-auto w-full">
                          <pre ref={codeExampleRef} className="text-white/90 text-xs whitespace-pre font-code w-full overflow-x-auto"></pre>
                        </div>
                      </motion.div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0 flex items-center justify-center shadow-glow">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div 
                      className="flex items-center space-x-2 text-white/50 ml-14"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.span 
                        className="w-2 h-2 bg-primary/50 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 1,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.span 
                        className="w-2 h-2 bg-primary/50 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.2,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.span 
                        className="w-2 h-2 bg-primary/50 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.4,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Command line input at bottom with auto-typing text */}
              <motion.div 
                className="mt-8 flex items-center bg-dark-900/40 border border-primary/10 rounded-lg px-3 py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-primary mr-2">❯</span>
                <span className="text-white/70 text-sm font-code">
                  <span ref={typedRef}></span>
                </span>
              </motion.div>
            </motion.div>
          </Tilt>
        </div>
      </div>
    </section>
  )
}

export default ChatSkills
