import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { 
  Home, Layers, Code, User, Mail, BrainCircuit, 
  Sparkles, ExternalLink, Gift, Award, Github, 
  MessageCircle, Bell, Calendar, LucideIcon, FileCode, 
  PersonStanding, GraduationCap, Heart, Rocket
} from 'lucide-react'
import ScrambleText from 'scramble-text'
import { useToast } from '@/hooks/use-toast'

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  color?: string
}

interface NotificationItem {
  id: string
  title: string
  message: string
  icon: React.ReactNode
  time: string
  read: boolean
  action?: () => void
}

const DynamicIslandNav: React.FC = () => {
  const [expanded, setExpanded] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadCount, setUnreadCount] = useState(2)
  const [pulseNotification, setPulseNotification] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const controls = useAnimation()
  
  // More visually appealing icons and sections
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

  // Sample notification data
  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Welcome!',
      message: 'Thanks for visiting my portfolio. Let me know if you have any questions!',
      icon: <Sparkles className="w-5 h-5 text-purple-400" />,
      time: 'Just now',
      read: false,
      action: () => {}
    },
    {
      id: '2',
      title: 'Check my latest project',
      message: 'My new AI-powered application just launched. Click to check it out!',
      icon: <BrainCircuit className="w-5 h-5 text-cyan-400" />,
      time: '2 hours ago',
      read: false,
      action: () => {
        const projects = document.getElementById('projects')
        if (projects) projects.scrollIntoView({ behavior: 'smooth' })
      }
    },
    {
      id: '3',
      title: 'Contact info updated',
      message: 'My contact information has been updated with new ways to reach me.',
      icon: <Mail className="w-5 h-5 text-blue-400" />,
      time: '1 day ago',
      read: true,
      action: () => {
        const contact = document.getElementById('contact')
        if (contact) contact.scrollIntoView({ behavior: 'smooth' })
      }
    }
  ]

  // Manage scroll state and active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Check if scrolled beyond hero section (expand navbar)
      if (currentScrollY > window.innerHeight * 0.5 && !isScrolled) {
        setIsScrolled(true)
        setExpanded(true)
      } else if (currentScrollY < window.innerHeight * 0.3 && isScrolled) {
        setIsScrolled(false)
        setExpanded(false)
      }
      
      setPrevScrollY(currentScrollY)
      
      // Set active section based on scroll position
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
  }, [isScrolled, navItems])
  
  // Initialize scramble text effect
  useEffect(() => {
    const elements = document.querySelectorAll('.scramble-text')
    elements.forEach(element => {
      const scramble = new ScrambleText(element, {
        timeOffset: 0.5,
        chars: '!<>-_\\/[]{}—=+*^?#'
      })
      
      // For text that should start immediately (like logo)
      if (element.classList.contains('scramble-on-load')) {
        scramble.start()
      }
      
      element.addEventListener('mouseenter', () => {
        scramble.start()
      })
      
      element.addEventListener('mouseleave', () => {
        scramble.stop()
      })
    })
    
    // Pulse notification periodically
    const interval = setInterval(() => {
      setPulseNotification(true)
      setTimeout(() => setPulseNotification(false), 1000)
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Click outside to close notifications
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Handle notification click
  const handleNotificationClick = (notification: NotificationItem) => {
    // Mark as read
    setUnreadCount(prev => prev - (notification.read ? 0 : 1))
    
    // Execute action if present
    if (notification.action) {
      notification.action()
    }
    
    // Show toast confirmation
    toast({
      title: notification.title,
      description: "Notification marked as read",
    })
    
    // Close notification panel
    setShowNotifications(false)
  }
  
  // Display as toast
  const showAsToast = (notification: NotificationItem) => {
    toast({
      title: notification.title,
      description: notification.message,
    })
    
    // Mark as read
    setUnreadCount(prev => prev - (notification.read ? 0 : 1))
    
    // Close notification panel
    setShowNotifications(false)
  }

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        className={`relative backdrop-blur-xl overflow-hidden border ${expanded ? 'border-primary/30' : 'border-primary/20'} rounded-full ${
          expanded ? 'bg-dark-800/90' : 'bg-dark-900/80'
        }`}
        animate={{
          width: expanded ? 680 : 200,
          height: expanded ? 68 : 48,
          boxShadow: expanded 
            ? '0 0 30px rgba(109, 40, 217, 0.3)'
            : '0 0 15px rgba(109, 40, 217, 0.2)'
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Logo section always visible */}
        <motion.div 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
            <span className="font-bold text-white text-sm">DH</span>
          </div>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-3 overflow-hidden"
              >
                <span className="font-space font-bold text-white text-lg scramble-text scramble-on-load">Delowar</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Navigation items in expanded state */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map(item => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className={`relative p-2 rounded-full transition-all duration-300 hover:bg-dark-700/40 ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-white/70 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    setActiveSection(item.id)
                    
                    // Execute smooth scroll
                    const element = document.getElementById(item.id)
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                    
                    // Optionally close the menu on mobile after clicking
                    if (window.innerWidth < 768) {
                      setExpanded(false)
                    }
                  }}
                >
                  <div className="flex flex-col items-center">
                    {item.icon}
                    <AnimatePresence>
                      {hoveredItem === item.id && (
                        <motion.span
                          className="absolute -bottom-5 text-xs whitespace-nowrap bg-dark-800/90 px-2 py-0.5 rounded"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    />
                  )}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Right side actions (Notifications + GitHub) */}
        <motion.div 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Notifications icon */}
          <div ref={notificationRef} className="relative">
            <motion.button
              className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                showNotifications ? 'bg-primary/20 text-primary' : 'text-white/80 hover:text-white hover:bg-dark-700/40'
              }`}
              onClick={() => setShowNotifications(!showNotifications)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: pulseNotification ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.4 }}
            >
              <Bell className="w-5 h-5" />
              
              {/* Notification badge */}
              {unreadCount > 0 && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  {unreadCount}
                </motion.div>
              )}
            </motion.button>
            
            {/* Dropdown notification panel */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  className="absolute top-10 right-0 w-80 bg-dark-800/95 backdrop-blur-lg border border-primary/20 rounded-xl shadow-lg shadow-primary/10 overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 border-b border-primary/10 flex justify-between items-center">
                    <h3 className="font-medium text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        className={`p-3 border-b border-dark-700/50 hover:bg-dark-700/30 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-primary/5' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-start">
                          <div className="mt-0.5 mr-3 p-2 rounded-full bg-dark-700/50">
                            {notification.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-white/90">{notification.title}</h4>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showAsToast(notification);
                                }}
                                className="text-primary/70 hover:text-primary"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-white/60 text-sm mt-1">{notification.message}</p>
                            <span className="text-white/40 text-xs mt-1 block">{notification.time}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="p-2 flex justify-center">
                    <button 
                      className="text-primary/70 hover:text-primary text-sm"
                      onClick={() => {
                        setUnreadCount(0)
                        setShowNotifications(false)
                        toast({
                          title: "All caught up!",
                          description: "You've read all notifications",
                        })
                      }}
                    >
                      Mark all as read
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* GitHub link */}
          <motion.a
            href="https://github.com/mdhossain-2437"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-dark-700/40 hover:bg-dark-700/60 rounded-full flex items-center justify-center text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
          </motion.a>
          
          {/* Expand/collapse toggle button - only show when not expanded automatically */}
          {!isScrolled && (
            <motion.button
              className="w-8 h-8 bg-dark-700/40 hover:bg-dark-700/60 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setExpanded(!expanded)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {expanded ? (
                  <motion.div
                    key="collapse"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M18 15H12L6 15"/>
                    </motion.svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="expand"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M3 6H15"/>
                      <path d="M3 12H21"/>
                      <path d="M3 18H9"/>
                    </motion.svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </motion.div>
      </motion.div>
      
      {/* Hiring status/availability chip */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-1 rounded-full text-xs text-white font-medium flex items-center space-x-1 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <span>Available for hire</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DynamicIslandNav