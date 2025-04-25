import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ChevronDown, Layers, MessageSquare, Code, Code2, Server, GlobeIcon, Sparkles, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Atropos from 'atropos/react'
import 'atropos/css'
import { gsap } from 'gsap'
import { useSpring, animated } from '@react-spring/web'
import Typed from 'typed.js'
import Lottie from 'react-lottie-player'

const HeroSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()
  const titleControls = useAnimation()
  const typedElement = useRef<HTMLElement>(null)
  const typingRef = useRef<Typed | null>(null)

  // Advanced animation with react-spring
  const [{ rotateX, rotateY, scale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  // Function to handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const container = containerRef.current.getBoundingClientRect()
      const x = e.clientX - container.left
      const y = e.clientY - container.top
      
      setMousePosition({ x, y })
      
      // Calculate rotation for react-spring (more precise 3D effect)
      const moveX = (x - container.width / 2) / 30
      const moveY = (y - container.height / 2) / -30
      
      api.start({
        rotateX: moveY,
        rotateY: moveX,
        scale: 1.02,
      })
      
      // Animate the hero title with a subtle tilt effect
      titleControls.start({
        x: moveX / 2,
        y: moveY / 2,
        transition: { type: 'spring', stiffness: 150, damping: 15 }
      })
    }
    
    const handleMouseLeave = () => {
      api.start({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      })
    }
    
    // Initialize typed.js for the animated typing
    if (typedElement.current) {
      typingRef.current = new Typed(typedElement.current, {
        strings: [
          'clean, scalable web experiences',
          'responsive, mobile-first designs',
          'performant, optimized websites',
          'creative AI-powered interfaces'
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        smartBackspace: true,
      })
    }
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove)
      containerRef.current.addEventListener('mouseleave', handleMouseLeave)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (typingRef.current) {
        typingRef.current.destroy()
      }
    }
  }, [titleControls, api])

  const scrollToNext = () => {
    const nextSection = document.getElementById('taskflow')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Create a gradient that follows the mouse
  const gradientStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(109, 40, 217, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, rgba(0, 0, 0, 0) 60%)`,
    position: 'absolute' as 'absolute',
    inset: 0,
    pointerEvents: 'none' as 'none',
    zIndex: 1
  }

  // SVG Code terminal for background
  const CodeTerminalSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="absolute top-10 right-10 text-white/10 md:block hidden" opacity="0.15">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m9 8-5 4 5 4" />
      <path d="m15 8 5 4-5 4" />
    </svg>
  )
  
  // SVG Server for background
  const ServerSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="absolute bottom-10 left-10 text-white/10 md:block hidden" opacity="0.15">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" x2="6" y1="6" y2="6" />
      <line x1="6" x2="6" y1="18" y2="18" />
    </svg>
  )

  // Create a simple animated react-svg lottie effect for background
  const svgData = {
    stars: [
      { x: '10%', y: '20%', size: 3, animation: 'pulseSlow' },
      { x: '30%', y: '15%', size: 2, animation: 'pulseQuick' },
      { x: '70%', y: '25%', size: 4, animation: 'pulseMedium' },
      { x: '20%', y: '80%', size: 3, animation: 'pulseSlow' },
      { x: '85%', y: '70%', size: 2, animation: 'pulseQuick' },
      { x: '65%', y: '85%', size: 3, animation: 'pulseMedium' },
    ]
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28">
      {/* Background blobs - advanced with GSAP animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full top-[-100px] left-[-200px] bg-primary/5 blur-3xl"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bottom-[-100px] right-[-100px] bg-secondary/5 blur-3xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 10,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] rounded-full top-[30%] left-[40%] bg-success/5 blur-3xl opacity-70"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 9,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Background stars/sparkles */}
        <div className="absolute inset-0">
          {svgData.stars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute text-white/20"
              style={{ 
                left: star.x, 
                top: star.y,
                width: star.size,
                height: star.size,
                background: 'currentColor',
                borderRadius: '50%'
              }}
              animate={{ 
                opacity: [0.2, 0.8, 0.2], 
                scale: [1, 1.3, 1]
              }}
              transition={{ 
                duration: star.animation === 'pulseSlow' ? 4 : star.animation === 'pulseMedium' ? 3 : 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
      
      <div 
        className="container mx-auto px-4 relative z-10"
        ref={containerRef}
      >
        {/* Mouse-follow gradient effect */}
        <div style={gradientStyle}></div>
        
        <div className="max-w-5xl mx-auto">
          <animated.div
            style={{
              transform: 'perspective(1000px)',
              rotateX,
              rotateY,
              scale,
              transformStyle: 'preserve-3d',
            }}
            className="w-full"
          >
            <motion.div 
              className="glass py-8 px-6 md:p-12 rounded-2xl relative overflow-hidden border border-primary/10 shadow-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background grid pattern and SVG decorations */}
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <CodeTerminalSvg />
              <ServerSvg />
              
              {/* Hero content with enhanced 3D effect */}
              <div className="relative z-10">
                <motion.div
                  animate={titleControls}
                  className="mb-6"
                >
                  <motion.h1 
                    className="font-space text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Hi, I'm <span className="relative text-gradient bg-gradient-to-r from-primary to-secondary inline-block">
                      Delowar
                    </span>
                    <br className="md:hidden" /> — Your Future{" "}
                    <span className="text-gradient bg-gradient-to-br from-primary via-secondary to-success inline-block text-transparent bg-clip-text animate-pulse-slow">
                      AI Web Dev
                    </span>
                  </motion.h1>
                  
                  <motion.div 
                    className="absolute top-2 right-2 md:top-4 md:right-4 rounded-full bg-gradient-to-r from-primary to-secondary p-2 text-white/90 shadow-glow"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.5, type: 'spring' }}
                    style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}
                  >
                    <Code className="w-4 h-4 md:w-6 md:h-6" />
                  </motion.div>
                  
                  <motion.p 
                    className="text-lg sm:text-xl md:text-2xl text-white/80 mt-6 mb-8 max-w-3xl mx-auto font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
                  >
                    I build <span className="font-code" ref={typedElement}></span>
                  </motion.p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
                >
                  <Button 
                    variant="gradient" 
                    size="lg-pill"
                    className="button-glow w-full sm:w-auto hover:scale-105 transition-all"
                    onClick={() => {
                      const projects = document.getElementById('projects')
                      if (projects) projects.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <Layers className="w-5 h-5 mr-2" />
                    <span className="relative">
                      View Projects
                      <motion.span 
                        className="absolute bottom-0 left-0 h-0.5 bg-white/30 w-0"
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 2, repeat: Infinity, repeatType: 'reverse' }}
                      />
                    </span>
                  </Button>
                  <Button 
                    variant="glass" 
                    size="lg-pill"
                    className="w-full sm:w-auto hover:border-primary/40 hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      window.location.href = '/resume'
                    }}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    <span className="relative">
                      View Resume
                      <motion.span 
                        className="absolute bottom-0 left-0 h-0.5 bg-primary/30 w-0"
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 2.2, repeat: Infinity, repeatType: 'reverse' }}
                      />
                    </span>
                  </Button>
                  <Button 
                    variant="glass" 
                    size="lg-pill"
                    className="w-full sm:w-auto hover:border-primary/40 hover:scale-105 transition-all duration-300"
                    onClick={() => {
                      const contact = document.getElementById('contact')
                      if (contact) contact.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    <span className="relative">
                      Hire Me
                      <motion.span 
                        className="absolute bottom-0 left-0 h-0.5 bg-primary/30 w-0"
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 2.5, repeat: Infinity, repeatType: 'reverse' }}
                      />
                    </span>
                  </Button>
                </motion.div>
              </div>

              {/* Command line input */}
              <motion.div 
                className="mt-10 pt-6 mx-auto max-w-xl bg-dark-900/40 border border-primary/10 rounded-lg px-4 py-3 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
              >
                <div className="flex items-center text-white/80 font-code text-sm overflow-x-auto whitespace-nowrap">
                  <span className="text-primary mr-2">$</span>
                  <span className="text-success mr-1">delowar</span>
                  <span className="text-white/60 mr-2">→</span>
                  <span className="text-secondary">npx</span>
                  <span className="text-white/90"> create-next-app@latest --ts --tailwind</span>
                  <motion.span 
                    className="ml-1 inline-block w-2 h-4 bg-white/80" 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Tech stack badges */}
              <motion.div 
                className="flex flex-wrap gap-2 justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d', transform: 'translateZ(10px)' }}
              >
                {[
                  { icon: <Code2 className="w-3 h-3 mr-1" />, label: 'React' },
                  { icon: <GlobeIcon className="w-3 h-3 mr-1" />, label: 'Tailwind' },
                  { icon: <Server className="w-3 h-3 mr-1" />, label: 'JavaScript' },
                  { icon: <Sparkles className="w-3 h-3 mr-1" />, label: 'CSS3' },
                  { icon: <Code className="w-3 h-3 mr-1" />, label: 'HTML5' },
                  { icon: <Server className="w-3 h-3 mr-1" />, label: 'API' }
                ].map((tech, index) => (
                  <motion.span 
                    key={index} 
                    className="text-xs rounded-full px-3 py-1 bg-primary/10 text-primary/90 font-medium flex items-center border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all cursor-pointer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 1.2 + 0.1 * index }}
                  >
                    {tech.icon} {tech.label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </animated.div>
          
          <motion.div 
            className="mt-12 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            ref={scrollRef}
          >
            <motion.div 
              className="inline-flex flex-col items-center text-white/60 hover:text-white cursor-pointer group"
              onClick={scrollToNext}
            >
              <span className="text-sm font-medium group-hover:text-primary transition-colors">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ChevronDown className="w-6 h-6 mt-2 group-hover:text-primary transition-colors" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
