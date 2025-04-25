import React, { useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Cpu, Layout, Code, Palette, Plug, Smartphone, Rocket, Terminal, CheckCircle, Clock, XCircle, ArrowRight } from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import { useSpring, animated } from '@react-spring/web'

type Task = {
  icon: React.ReactNode
  title: string
  description: string
  status: 'Completed' | 'In Progress' | 'Planned'
  progress: number
}

const TaskFlow: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Begin animation when component enters viewport
  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const tasks: Task[] = [
    {
      icon: <Layout className="w-5 h-5 text-primary" />,
      title: 'Planning UI/UX',
      description: 'Analyze requirements, create wireframes, and design a user-friendly interface.',
      status: 'Completed',
      progress: 100
    },
    {
      icon: <Code className="w-5 h-5 text-primary" />,
      title: 'Writing React Code',
      description: 'Build reusable components, implement state management, and ensure performance.',
      status: 'Completed',
      progress: 100
    },
    {
      icon: <Palette className="w-5 h-5 text-primary" />,
      title: 'Styling with Tailwind',
      description: 'Apply modern CSS with utility classes for responsive, clean interfaces.',
      status: 'Completed',
      progress: 100
    },
    {
      icon: <Plug className="w-5 h-5 text-primary" />,
      title: 'API Integration',
      description: 'Connect to APIs, handle data fetching, and implement error handling.',
      status: 'In Progress',
      progress: 75
    },
    {
      icon: <Smartphone className="w-5 h-5 text-primary" />,
      title: 'Responsive Testing',
      description: 'Test across devices to ensure a seamless experience on all screen sizes.',
      status: 'In Progress',
      progress: 60
    },
    {
      icon: <Rocket className="w-5 h-5 text-primary" />,
      title: 'Deployment',
      description: 'Optimize for production and deploy to hosting platforms with CI/CD.',
      status: 'Planned',
      progress: 25
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5 
      } 
    }
  }

  // StatusIcon component for better visual representation
  const StatusIcon = ({ status }: { status: string }) => {
    switch(status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 mr-1 text-success" />
      case 'In Progress':
        return <Clock className="w-4 h-4 mr-1 text-secondary animate-pulse" />
      default:
        return <ArrowRight className="w-4 h-4 mr-1 text-primary/50" />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'text-success bg-success/10 border border-success/20'
      case 'In Progress': return 'text-secondary bg-secondary/10 border border-secondary/20'
      default: return 'text-white/50 bg-white/5 border border-white/10'
    }
  }

  const getProgressBarColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-success'
      case 'In Progress': return 'bg-secondary'
      default: return 'bg-white/30'
    }
  }
  
  // Create SVG path for a polished progress bar
  const ProgressSVG = ({ progress, status }: { progress: number, status: string }) => {
    const color = status === 'Completed' ? '#10b981' : status === 'In Progress' ? '#8b5cf6' : '#9ca3af';
    const trailColor = 'rgba(31, 31, 31, 0.3)';
    
    return (
      <svg width="100%" height="8" className="overflow-visible">
        <defs>
          <linearGradient id={`gradient-${status}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <rect x="0" y="0" width="100%" height="8" rx="4" fill={trailColor} />
        
        {/* Progress bar with animated width */}
        <motion.rect
          x="0"
          y="0"
          height="8"
          rx="4"
          fill={`url(#gradient-${status})`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Glowing effect for completed or in-progress tasks */}
        {(status === 'Completed' || status === 'In Progress') && (
          <motion.rect
            x="0"
            y="0"
            height="8"
            rx="4"
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeOpacity="0.5"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
          />
        )}
        
        {/* Progress indicator dot that moves along */}
        {progress > 0 && progress < 100 && (
          <motion.circle
            r="5"
            fill={color}
            filter="drop-shadow(0 0 3px rgba(139, 92, 246, 0.7))"
            initial={{ cx: 0 }}
            animate={{ cx: `${progress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
        
        {/* Pulsing completion marker for completed tasks */}
        {progress === 100 && (
          <motion.circle
            cx="100%"
            cy="4"
            r="5"
            fill="#10b981"
            animate={{ 
              r: [5, 6, 5],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </svg>
    );
  };

  // Code terminal SVG decoration
  const CodeTerminalSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="absolute -bottom-8 -right-8 text-primary/5 rotate-12">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m9 8-5 4 5 4" />
      <path d="m15 8 5 4-5 4" />
    </svg>
  )

  return (
    <section id="taskflow" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-dark-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-dark-900 to-transparent"></div>
      </div>
      
      {/* Background grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <motion.div className="inline-block mb-4">
              <div className="bg-primary/10 rounded-full p-3 inline-block">
                <Code className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </motion.div>
            
            <motion.h2 
              className="font-space text-3xl md:text-5xl font-bold mb-4 text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              My Development Workflow
            </motion.h2>
            <motion.p 
              className="text-white/70 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              See how I break down complex projects into manageable tasks, similar to an AI development system.
            </motion.p>
          </motion.div>
          
          <Tilt
            tiltMaxAngleX={3}
            tiltMaxAngleY={3}
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#6d28d9"
            glarePosition="all"
            glareBorderRadius="12px"
            className="mb-12"
            perspective={1500}
          >
            <motion.div 
              className="glass p-4 md:p-8 rounded-2xl relative overflow-hidden border border-primary/20 shadow-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Background grid pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <CodeTerminalSvg />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 relative z-10">
                <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="h-6 w-px bg-white/10 mx-2"></div>
                  <div className="text-white/70 text-xs font-code">development_flow.tsx</div>
                </div>
                <div className="glass-card py-1 px-3 rounded-full flex items-center space-x-2 text-white/70 text-sm border border-primary/10">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="font-code text-xs">AI Dev Mode <span className="animate-pulse">▮</span></span>
                </div>
              </div>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
                variants={container}
                initial="hidden"
                animate={controls}
                exit="hidden"
              >
                {tasks.map((task, index) => (
                  <motion.div 
                    key={index} 
                    className="glass-card p-5 rounded-xl transition-all duration-300 border border-primary/5 hover:border-primary/20 overflow-hidden"
                    variants={item}
                    custom={index}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.2), 0 0 15px rgba(109, 40, 217, 0.2)' 
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          {task.icon}
                        </div>
                        <h3 className="font-space font-medium">{task.title}</h3>
                      </div>
                      <div className={`${getStatusColor(task.status)} text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1`}>
                        <StatusIcon status={task.status} />
                        <span>{task.status}</span>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mb-4 ml-11">{task.description}</p>
                    <div className="ml-11 relative">
                      <div className="flex justify-between text-xs text-white/50 mb-1">
                        <span>{task.progress}% complete</span>
                        <span>{task.status === 'Completed' ? 'Done' : task.status === 'In Progress' ? 'Working...' : 'Upcoming'}</span>
                      </div>
                      <ProgressSVG progress={task.progress} status={task.status} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Command line prompt at bottom */}
              <motion.div 
                className="mt-8 flex items-center bg-dark-900/40 border border-primary/10 rounded-lg px-3 py-2 font-code text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-primary mr-2">$</span>
                <span className="text-success mr-1">delowar</span>
                <span className="text-white/60 mr-2">→</span>
                <span className="text-secondary">git</span>
                <span className="text-white/90"> commit -m "feat: added responsive design"</span>
                <motion.span 
                  className="ml-1 inline-block w-2 h-4 bg-white/80" 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </Tilt>
        </div>
      </div>
    </section>
  )
}

export default TaskFlow
