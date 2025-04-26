import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Mail, FileText, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'

type TimelineItem = {
  year: string
  title: string
  description: string
  status: 'past' | 'current' | 'future'
}

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  })

  const [timelineRef, timelineInView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  })

  const timeline: TimelineItem[] = [
    {
      year: '2022',
      title: 'Started Learning Web Development',
      description: 'Began self-learning HTML, CSS, and JavaScript',
      status: 'past'
    },
    {
      year: '2023',
      title: 'First Portfolio Projects',
      description: 'Created my first portfolio website and started working with Bootstrap',
      status: 'past'
    },
    {
      year: '2024',
      title: 'Advanced Frontend Development',
      description: 'Learned Tailwind CSS and started exploring React.js',
      status: 'past'
    },
    {
      year: 'Now',
      title: 'Currently Learning',
      description: 'Deepening React knowledge and API integration skills',
      status: 'current'
    },
    {
      year: 'Next',
      title: 'Future Goals',
      description: 'Becoming a full-stack developer with extensive React experience',
      status: 'future'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }

  const profileVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  }

  const bioVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.4 }
    }
  }

  const timelineContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const timelineItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden bg-dark-900/80">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <h2 className="font-space text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Learn about my journey, experience, and what drives me as a web developer.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass p-6 md:p-8 rounded-2xl glow"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <motion.div 
                className="lg:w-1/3 flex justify-center lg:justify-start"
                variants={profileVariants}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-30 rounded-2xl blur-2xl"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80"
                    alt="Delowar Hossain" 
                    className="w-60 h-60 object-cover rounded-2xl relative z-10"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-primary to-secondary p-3 rounded-lg text-white z-10">
                    <Code className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:w-2/3"
                variants={bioVariants}
              >
                <h3 className="font-space text-2xl font-bold mb-4">MD Delowar Hossain</h3>
                <p className="text-white/80 mb-4">
                  I am a passionate Junior Web Developer with a strong foundation in HTML, CSS, Tailwind CSS, Bootstrap, 
                  JavaScript (ES6), React, and API integration. I am eager to expand my skills, particularly in React.js, 
                  and gain hands-on experience in real-world projects.
                </p>
                <p className="text-white/80 mb-6">
                  I thrive in problem-solving environments, enjoy working both independently and collaboratively, 
                  and am always keen to learn new technologies.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-space font-medium text-lg mb-3">Education</h4>
                    <div className="glass-card p-4 rounded-xl">
                      <div className="flex items-start">
                        <GraduationCap className="w-5 h-5 text-primary mr-3 mt-1" />
                        <div>
                          <h5 className="font-medium">Higher Secondary Certificate (HSC)</h5>
                          <p className="text-white/70 text-sm">Humanities • 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-space font-medium text-lg mb-3">Languages</h4>
                    <div className="glass-card p-4 rounded-xl">
                      <div className="flex items-center mb-3">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span className="mr-2">Bengali</span>
                        <span className="text-white/70 text-sm">(Native)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        <span className="mr-2">English</span>
                        <span className="text-white/70 text-sm">(Proficient in written, basic spoken)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="gradient" size="pill" asChild>
                    <a href="#contact">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="font-space font-medium">Contact Me</span>
                    </a>
                  </Button>
                  <Button variant="glass" size="pill" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="font-space font-medium">Download CV</span>
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={timelineInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            ref={timelineRef}
          >
            <h3 className="font-space text-2xl font-bold mb-8 text-center">My Journey Timeline</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-secondary/30"></div>
              
              {/* Timeline Items */}
              <motion.div 
                className="space-y-12"
                variants={timelineContainerVariants}
                initial="hidden"
                animate={timelineInView ? "visible" : "hidden"}
              >
                {timeline.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="relative flex items-center justify-center"
                    variants={timelineItemVariants}
                  >
                    <div className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 
                      ${item.status === 'current' ? 'bg-success' : item.status === 'future' ? 'bg-dark-700 border-2 border-dashed border-primary' : 'bg-primary'} 
                      rounded-full z-10 ${item.status === 'current' ? 'glow-success' : item.status !== 'future' ? 'glow' : ''}`}>
                    </div>
                    
                    <div className="w-5/12 pr-10 text-right">
                      {index % 2 === 0 ? (
                        <div>
                          <h4 className="font-space font-medium text-lg">{item.title}</h4>
                          <p className="text-white/70">{item.description}</p>
                        </div>
                      ) : (
                        <div className={`glass-card p-2 px-4 rounded-lg inline-block 
                          ${item.status === 'current' ? 'text-success' : item.status === 'future' ? 'opacity-60' : ''}`}>
                          {item.year}
                        </div>
                      )}
                    </div>
                    
                    <div className="w-5/12 pl-10">
                      {index % 2 === 0 ? (
                        <div className={`glass-card p-2 px-4 rounded-lg inline-block 
                          ${item.status === 'current' ? 'text-success' : item.status === 'future' ? 'opacity-60' : ''}`}>
                          {item.year}
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-space font-medium text-lg">{item.title}</h4>
                          <p className="text-white/70">{item.description}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
