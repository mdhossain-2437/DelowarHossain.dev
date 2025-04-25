import React, { useState, useEffect } from 'react'
import { Menu, ArrowRight, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, useAnimation } from 'framer-motion'
import MobileMenu from './MobileMenu'

interface NavBarProps {
  setMobileMenuOpen: (isOpen: boolean) => void
}

const NavBar: React.FC<NavBarProps> = ({ setMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const controls = useAnimation()

  // Handle navigation appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
        controls.start({
          height: 70,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        })
      } else {
        setScrolled(false)
        controls.start({
          height: 80,
          boxShadow: 'none'
        })
      }
      
      // Determine active section based on scroll position
      const sections = ['home', 'skills', 'services', 'projects', 'about', 'contact']
      for (const section of sections.reverse()) { // Check from bottom to top
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the top of the element is above the middle of the viewport
          if (rect.top <= window.innerHeight/2) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [controls])

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <motion.nav 
      className={`fixed w-full z-50 px-4 md:px-8 border-b transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-md bg-dark-900/70 border-primary/20' 
          : 'backdrop-blur-sm bg-dark-900/30 border-transparent'
      }`}
      initial={{ y: -100, height: 80 }}
      animate={{ 
        y: 0, 
        ...controls
      }}
      transition={{ 
        y: { duration: 0.5 },
        height: { duration: 0.3 },
        boxShadow: { duration: 0.3 }
      }}
    >
      <div className="container mx-auto flex justify-between items-center h-full">
        <a href="#" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-dark-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              whileHover={{ scale: 1.5, rotate: 45 }}
            />
          
            <svg className='relative z-10' width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#C084FC" stop-opacity="0.6" />
      <stop offset="100%" stop-color="#6D28D9" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="paint0_linear" x1="0" y1="0" x2="0" y2="1024" gradientUnits="userSpaceOnUse">
      <stop stop-color="#C084FC"/>
      <stop offset="1" stop-color="#6D28D9"/>
    </linearGradient>
  </defs>
  <circle cx="512" cy="512" r="420" fill="url(#glowGradient)" />
  <circle cx="512" cy="512" r="400" stroke="url(#paint0_linear)" stroke-width="60" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="50%" y="50%" text-anchor="middle" dy="0.35em" font-size="300" font-family="'Poppins', sans-serif" font-weight="900" fill="white" letter-spacing="12">DH</text>
</svg>

          </div>
          <div className="hidden md:block">
            <span className="font-space font-medium text-lg text-white block leading-tight">Delowar.dev</span>
            <span className="text-xs text-primary/80 font-medium">Web Developer</span>
          </div>
        </a>
        
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className={`relative text-sm font-medium transition-colors py-2 group ${
                activeSection === item.href.substring(1) 
                  ? 'text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
              <div 
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                  activeSection === item.href.substring(1) 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`} 
              />
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden text-white p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Button 
            variant="gradient" 
            size="pill" 
            className="hidden sm:flex button-glow" 
            asChild
          >
            <a href="#contact">
              <Code className="w-4 h-4 mr-2" />
              <span className="font-space font-medium">Hire Me</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}

export default NavBar
