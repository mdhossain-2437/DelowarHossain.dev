import React, { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import MobileMenu from '@/components/MobileMenu'
import HeroSection from '@/components/HeroSection'
import TaskFlow from '@/components/TaskFlow'
import ChatSkills from '@/components/ChatSkills'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import AnimatedBackground from '@/components/AnimatedBackground'
import Achievements from '@/components/Achievements'
import Testimonials from '@/components/Testimonials'
import LearningRoadmap from '@/components/LearningRoadmap'
import ScrollRevealSection, { ScrollParallaxItem } from '@/components/ScrollRevealSection'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Home: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  
  // Show back to top button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-dark-900 text-white min-h-screen">
      {/* We don't need the AnimatedBackground here since it's already in App.tsx */}
      
      {/* Keep the old navbar for now, but it will be replaced by DynamicIslandNav from App.tsx */}
      {/* <NavBar setMobileMenuOpen={setMobileMenuOpen} /> */}
      {/* <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} /> */}
      
      <main className="overflow-x-hidden">
        <ScrollRevealSection>
          <HeroSection />
        </ScrollRevealSection>
        
        <ScrollRevealSection direction="right" distance={40}>
          <TaskFlow />
        </ScrollRevealSection>
        
        <ScrollParallaxItem speed={0.2}>
          <ScrollRevealSection direction="left" distance={40}>
            <ChatSkills />
          </ScrollRevealSection>
        </ScrollParallaxItem>
        
        <ScrollRevealSection direction="up" distance={40}>
          <Services />
        </ScrollRevealSection>
        
        <ScrollRevealSection staggerChildren={true} staggerDelay={0.1}>
          <Projects />
        </ScrollRevealSection>
        
        <ScrollParallaxItem speed={0.1}>
          <ScrollRevealSection>
            <Achievements />
          </ScrollRevealSection>
        </ScrollParallaxItem>
        
        <ScrollRevealSection direction="left" distance={30}>
          <Testimonials />
        </ScrollRevealSection>
        
        <ScrollRevealSection direction="right" distance={40}>
          <LearningRoadmap />
        </ScrollRevealSection>
        
        <ScrollRevealSection direction="left" distance={40}>
          <About />
        </ScrollRevealSection>
        
        <ScrollRevealSection>
          <Contact />
        </ScrollRevealSection>
      </main>
      
      <Footer />
      
      {/* Back to top button with animation */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.a 
            href="#home" 
            className="fixed bottom-6 right-6 w-10 h-10 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center text-white transition-all duration-300 z-30 shadow-glow"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: '0 0 20px rgba(109, 40, 217, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home
