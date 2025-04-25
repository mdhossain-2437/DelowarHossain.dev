import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowRight, Code, Home, Code2, Layers, User, Mail, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const handleLinkClick = () => {
    setIsOpen(false)
  }
  
  // Prevent scrolling when menu is open
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

  const navItems = [
    { href: '#home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { href: '#skills', label: 'Skills', icon: <Code2 className="w-5 h-5" /> },
    { href: '#services', label: 'Services', icon: <Briefcase className="w-5 h-5" /> },
    { href: '#projects', label: 'Projects', icon: <Layers className="w-5 h-5" /> },
    { href: '#about', label: 'About', icon: <User className="w-5 h-5" /> },
    { href: '#contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> }
  ]

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.05 * i,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    exit: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile menu content */}
          <motion.div 
            className="relative h-full flex flex-col pt-20 px-6 pb-8 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <motion.button 
              className="absolute top-6 right-6 text-white p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-space font-bold text-white text-lg">DH</span>
              </div>
              <div>
                <h3 className="font-space font-bold text-white text-xl">Delowar Hossain</h3>
                <p className="text-white/60 text-sm">Web Developer</p>
              </div>
            </motion.div>
            
            {/* Navigation items */}
            <div className="space-y-4 mb-auto">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.href} 
                  href={item.href} 
                  className="flex items-center space-x-4 p-4 rounded-xl glass-card hover:border-primary/20 transition-all duration-300 group"
                  onClick={handleLinkClick}
                  custom={index}
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-lg font-space text-white group-hover:translate-x-1 transition-transform duration-300">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>
            
            {/* CTA Button */}
            <motion.div 
              className="mt-8 pt-6 border-t border-primary/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                variant="gradient" 
                size="lg-pill" 
                className="w-full py-6 text-lg button-glow"
                asChild
                onClick={handleLinkClick}
              >
                <a href="#contact" className="flex justify-center items-center">
                  <Code className="w-5 h-5 mr-2" />
                  <span className="font-space font-medium">Hire Me</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              
              {/* Social links placeholder */}
              <div className="flex justify-center space-x-4 mt-6">
                {[1, 2, 3].map((_, index) => (
                  <motion.a 
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-white hover:bg-primary/20 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
