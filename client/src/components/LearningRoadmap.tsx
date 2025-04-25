import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { 
  BookOpenCheck, Rocket, Zap, Brain, BadgeCheck, 
  GraduationCap, Sparkles, Cpu, Code, Database, 
  BarChart, Layers, GitBranch, Bot, Puzzle
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ScrollRevealSection from './ScrollRevealSection'

// Define learning milestone type
interface LearningMilestone {
  id: string
  icon: React.ReactNode
  iconColor: string
  title: string
  timeframe: string
  goals: string[]
  tools: string[]
  isCompleted?: boolean
  inProgress?: boolean
}

const LearningRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState('timeline')
  const roadmapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(roadmapRef, { once: false })
  const controls = useAnimation()
  const rocketControls = useAnimation()
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Learning milestones data
  const milestones: LearningMilestone[] = [
    {
      id: 'frontend',
      icon: <Code className="w-8 h-8" />,
      iconColor: 'bg-gradient-to-br from-blue-500 to-cyan-400',
      title: '⚛️ Advanced Frontend Mastery',
      timeframe: 'May–July 2025',
      goals: [
        'Master latest React 19 features and patterns',
        'Build high-performance SPAs with animations',
        'Implement micro-interactions and advanced state management'
      ],
      tools: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'Zustand'],
      isCompleted: true
    },
    {
      id: 'backend',
      icon: <Database className="w-8 h-8" />,
      iconColor: 'bg-gradient-to-br from-emerald-500 to-green-400',
      title: '🔄 Backend & API Expertise',
      timeframe: 'August–October 2025',
      goals: [
        'Design scalable REST and GraphQL APIs',
        'Implement authentication systems with OAuth/JWT',
        'Build real-time features with WebSockets'
      ],
      tools: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Redis'],
      inProgress: true
    },
    {
      id: 'ml',
      icon: <Brain className="w-8 h-8" />,
      iconColor: 'bg-gradient-to-br from-violet-500 to-purple-400',
      title: '🧠 Machine Learning Foundations',
      timeframe: 'November 2025–January 2026',
      goals: [
        'Learn ML fundamentals and algorithms',
        'Train basic models for classification/regression',
        'Implement web-based ML applications'
      ],
      tools: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Jupyter']
    },
    {
      id: 'llm',
      icon: <Bot className="w-8 h-8" />,
      iconColor: 'bg-gradient-to-br from-pink-500 to-rose-400',
      title: '🤖 LLM & AI Integration',
      timeframe: 'February–April 2026',
      goals: [
        'Work with LLM APIs and fine-tuning',
        'Build AI-powered assistants for web apps',
        'Develop prompt engineering expertise'
      ],
      tools: ['OpenAI API', 'Langchain', 'Hugging Face', 'Vector Databases', 'embeddings']
    },
    {
      id: 'dream',
      icon: <Sparkles className="w-8 h-8" />,
      iconColor: 'bg-gradient-to-br from-amber-500 to-yellow-400',
      title: '✨ CodeWarrior AI Project',
      timeframe: 'Mid-late 2026',
      goals: [
        'Create an AI developer assistant',
        'Build tools for code generation and debugging',
        'Develop innovative UX for AI-human collaboration'
      ],
      tools: ['LLMs', 'DevOps', 'CI/CD', 'Cloud Infrastructure', 'AI UX Design']
    }
  ]
  
  // Animation for rocket along the roadmap
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } })
      
      // Animate rocket along the path
      const animateRocket = async () => {
        await rocketControls.start({
          top: ['0%', '25%', '50%', '75%', '100%'],
          transition: { 
            duration: 10, 
            ease: 'linear', 
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Infinity
          }
        })
      }
      
      animateRocket()
    } else {
      controls.start({ opacity: 0, y: 50 })
    }
  }, [inView, controls, rocketControls])
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  }

  return (
    <section id="roadmap" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-dark-800 to-dark-900">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto" ref={roadmapRef}>
          {/* Section header */}
          <ScrollRevealSection>
            <div className="text-center mb-14">
              <motion.div 
                className="inline-block mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-primary/10 backdrop-blur-sm p-2 rounded-full inline-block">
                  <Rocket className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
              </motion.div>
              
              <motion.h2 
                className="font-space text-3xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Learning <span className="text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">Roadmap</span>
              </motion.h2>
              
              <motion.p 
                className="text-white/70 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                I believe in lifelong learning. Here's what's next on my roadmap as I evolve from a Web Developer to an AI-powered full-stack engineer.
              </motion.p>
            </div>
          </ScrollRevealSection>
          
          {/* Tab selector */}
          <div className="flex justify-center mb-10">
            <div className="bg-dark-800/70 backdrop-blur-sm p-1 rounded-full border border-primary/10 flex">
              <button
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === 'timeline' 
                    ? 'bg-primary text-white shadow-glow-sm' 
                    : 'text-white/70 hover:text-white hover:bg-dark-700/50'
                }`}
                onClick={() => setActiveTab('timeline')}
              >
                Timeline View
              </button>
              <button
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === 'cards' 
                    ? 'bg-primary text-white shadow-glow-sm' 
                    : 'text-white/70 hover:text-white hover:bg-dark-700/50'
                }`}
                onClick={() => setActiveTab('cards')}
              >
                Cards View
              </button>
            </div>
          </div>
          
          {/* Timeline view */}
          {activeTab === 'timeline' && (
            <div className="relative max-w-3xl mx-auto py-10">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/30 via-secondary/30 to-primary/30 top-0"></div>
              
              {/* Animated rocket */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2 z-20"
                initial={{ top: "0%" }}
                animate={rocketControls}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    y: [0, -5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-glow"
                >
                  <Rocket className="w-6 h-6 text-white" />
                </motion.div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-1 h-10 bg-gradient-to-b from-transparent to-orange-500/50 blur-sm"></div>
              </motion.div>
              
              {/* Timeline items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                {milestones.map((milestone, index) => {
                  const isEven = index % 2 === 0
                  
                  return (
                    <motion.div 
                      key={milestone.id}
                      className={`relative mb-16 flex ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                      variants={itemVariants}
                    >
                      {/* Content */}
                      <div className={`w-5/12 ${isEven ? 'pr-10 text-right' : 'pl-10 text-left'}`}>
                        <motion.div
                          className={`glass p-6 rounded-xl border border-primary/10 shadow-lg ${
                            milestone.isCompleted 
                              ? 'bg-primary/5 border-primary/30' 
                              : milestone.inProgress 
                                ? 'bg-secondary/5 border-secondary/20'
                                : ''
                          }`}
                          whileHover={{ y: -5, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg ${milestone.iconColor} text-white`}>
                              {milestone.icon}
                            </div>
                            <div>
                              <h3 className="font-space font-bold text-lg text-white">{milestone.title}</h3>
                              <p className="text-white/70 text-sm">{milestone.timeframe}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-white/90 font-medium mb-1">Goals:</h4>
                              <ul className="space-y-1">
                                {milestone.goals.map((goal, idx) => (
                                  <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
                                    <BadgeCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>{goal}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-white/90 font-medium mb-1">Tools:</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {milestone.tools.map((tool, idx) => (
                                  <span 
                                    key={idx}
                                    className="inline-block bg-dark-800/80 text-white/80 text-xs px-2 py-1 rounded"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* Status indicator */}
                          {milestone.isCompleted && (
                            <div className="mt-3 flex items-center justify-end gap-1 text-green-400 text-xs">
                              <BadgeCheck className="w-4 h-4" />
                              <span>Completed</span>
                            </div>
                          )}
                          
                          {milestone.inProgress && (
                            <div className="mt-3 flex items-center justify-end gap-1 text-blue-400 text-xs">
                              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                              <span>In Progress</span>
                            </div>
                          )}
                        </motion.div>
                      </div>
                      
                      {/* Connector */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                        <div 
                          className={`w-8 h-8 rounded-full border-4 ${
                            milestone.isCompleted 
                              ? 'border-primary bg-dark-900' 
                              : milestone.inProgress
                                ? 'border-secondary bg-dark-900'
                                : 'border-white/30 bg-dark-900'
                          }`}
                        >
                          {milestone.isCompleted && (
                            <div className="w-full h-full flex items-center justify-center">
                              <BadgeCheck className="w-4 h-4 text-primary" />
                            </div>
                          )}
                          
                          {milestone.inProgress && (
                            <div className="w-2 h-2 m-auto rounded-full bg-secondary animate-pulse"></div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          )}
          
          {/* Cards View */}
          {activeTab === 'cards' && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {milestones.map((milestone) => (
                <motion.div
                  key={milestone.id}
                  className="glass rounded-xl border border-primary/10 overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)' }}
                >
                  <div className={`h-2 ${milestone.iconColor}`}></div>
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-3 rounded-lg ${milestone.iconColor} text-white`}>
                        {milestone.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-space font-bold text-lg text-white">{milestone.title}</h3>
                          {milestone.isCompleted && (
                            <BadgeCheck className="w-5 h-5 text-green-400" />
                          )}
                          {milestone.inProgress && (
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-400 animate-pulse"></div>
                          )}
                        </div>
                        <p className="text-white/70 text-sm">{milestone.timeframe}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white/90 font-medium mb-2">Goals:</h4>
                        <ul className="space-y-1.5">
                          {milestone.goals.map((goal, idx) => (
                            <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
                              <BadgeCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-white/90 font-medium mb-2">Tools:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {milestone.tools.map((tool, idx) => (
                            <span 
                              key={idx}
                              className="inline-block bg-dark-800/80 text-white/80 text-xs px-2 py-1 rounded"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Status indicator */}
                    {milestone.isCompleted && (
                      <div className="mt-4 flex items-center justify-start gap-1 text-green-400 text-xs">
                        <BadgeCheck className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    )}
                    
                    {milestone.inProgress && (
                      <div className="mt-4 flex items-center justify-start gap-1 text-blue-400 text-xs">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                        <span>In Progress</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {/* Vision Section */}
          <ScrollRevealSection>
            <div className="mt-24 rounded-2xl border border-primary/20 overflow-hidden">
              <div className="p-8 relative">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-800/50 to-dark-900/50 z-0"></div>
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-primary via-secondary to-primary"></div>
                
                <div className="relative z-10">
                  <motion.h3 
                    className="font-space text-2xl md:text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    My Ultimate Vision 🎯
                  </motion.h3>
                  
                  <div className="mb-8">
                    <p className="text-white/80 mb-6 text-lg leading-relaxed">
                      My ultimate goal is to create an AI-powered developer assistant capable of building, debugging, and deploying projects with minimal input — a futuristic partner for every coder.
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 glass p-5 rounded-xl border border-primary/10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-400 text-white">
                            <Bot className="w-6 h-6" />
                          </div>
                          <h4 className="font-space font-bold text-lg text-white">Mission: Build "CodeWarrior AI"</h4>
                        </div>
                        <p className="text-white/70">An AI-powered pair programmer that helps developers write, debug, and optimize code with natural language interaction.</p>
                      </div>
                      
                      <div className="flex-1 glass p-5 rounded-xl border border-primary/10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-400 text-white">
                            <Sparkles className="w-6 h-6" />
                          </div>
                          <h4 className="font-space font-bold text-lg text-white">Key Features</h4>
                        </div>
                        <ul className="space-y-1">
                          <li className="text-white/70 text-sm flex items-start gap-2">
                            <BadgeCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>Context-aware code understanding & generation</span>
                          </li>
                          <li className="text-white/70 text-sm flex items-start gap-2">
                            <BadgeCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>Intelligent error fixing & optimization suggestions</span>
                          </li>
                          <li className="text-white/70 text-sm flex items-start gap-2">
                            <BadgeCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>Natural language UI for human-AI collaboration</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </div>
    </section>
  )
}

export default LearningRoadmap