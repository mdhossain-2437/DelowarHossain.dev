import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, Layers, Code, User, Mail, BrainCircuit, 
  Award, Rocket, Menu, X
} from 'lucide-react'

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  color?: string
}

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '#home', icon: <Home className="w-5 h-5" />, color: 'bg-gradient-to-br from-purple-500 to-indigo-600' },
    { id: 'skills', label: 'Skills', href: '#skills', icon: <BrainCircuit className="w-5 h-5" />, color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { id: 'projects', label: 'Projects', href: '#projects', icon: <Layers className="w-5 h-5" />, color: 'bg-gradient-to-br from-green-500 to-emerald-600' },
    { id: 'services', label: 'Services', href: '#services', icon: <Code className="w-5 h-5" />, color: 'bg-gradient-to-br from-rose-500 to-pink-600' },
    { id: 'achievements', label: 'Achievements', href: '#achievements', icon: <Award className="w-5 h-5" />, color: 'bg-gradient-to-br from-yellow-500 to-amber-600' },
    { id: 'roadmap', label: 'Learning Path', href: '#roadmap', icon: <Rocket className="w-5 h-5" />, color: 'bg-gradient-to-br from-orange-500 to-red-500' },
    { id: 'about', label: 'About', href: '#about', icon: <User className="w-5 h-5" />, color: 'bg-gradient-to-br from-amber-500 to-orange-600' },
    { id: 'contact', label: 'Contact', href: '#contact', icon: <Mail className="w-5 h-5" />, color: 'bg-gradient-to-br from-indigo-500 to-purple-600' }
  ]

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id)
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <motion.button
        className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-dark-800/90 backdrop-blur-xl border border-primary/20 flex items-center justify-center text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-dark-900/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Menu content */}
            <motion.div
              className="h-full flex flex-col items-center justify-center p-6"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Logo */}
              <div className="mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                  <span className="font-bold text-white text-xl">DH</span>
                </div>
              </div>

              {/* Navigation items */}
              <nav className="w-full max-w-sm">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                          activeSection === item.id
                            ? 'bg-primary/20 text-primary'
                            : 'text-white/70 hover:text-white hover:bg-dark-800/50'
                        }`}
                        onClick={() => {
                          setIsOpen(false)
                          const element = document.getElementById(item.id)
                          if (element) element.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.label}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Availability status */}
              <motion.div
                className="mt-8 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium flex items-center space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span>Available for hire</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNavigation 