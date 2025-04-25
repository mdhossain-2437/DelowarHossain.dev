import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CursorTracker: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [cursorSize, setCursorSize] = useState({ width: 400, height: 400 })

  useEffect(() => {
    // Initialize cursor position to center of screen to avoid initial position issue
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
      
      if (!isActive) {
        setIsActive(true)
      }
    }
    
    // Handle touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        })
        
        if (!isActive) {
          setIsActive(true)
        }
      }
    }
    
    // Small cursor on interactive elements
    const handleMouseEnterInteractive = () => {
      setCursorSize({ width: 200, height: 200 })
    }
    
    // Regular cursor size on non-interactive elements
    const handleMouseLeaveInteractive = () => {
      setCursorSize({ width: 400, height: 400 })
    }
    
    // Hiding the cursor when it's idle
    let timeout: number
    const resetTimeout = () => {
      clearTimeout(timeout)
      setIsActive(true)
      timeout = window.setTimeout(() => {
        setIsActive(false)
      }, 3000) // Hide cursor after 3 seconds of inactivity
    }
    
    // Add interactive element handlers
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive)
      el.addEventListener('mouseleave', handleMouseLeaveInteractive)
    })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('mousemove', resetTimeout)
    
    // Initial timeout
    resetTimeout()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mousemove', resetTimeout)
      clearTimeout(timeout)
      
      // Clean up interactive element handlers
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive)
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
      })
    }
  }, [isActive])

  // Only show on larger screens (not mobile)
  const showCursor = typeof window !== 'undefined' && window.innerWidth > 768

  return showCursor ? (
    <motion.div
      className="cursor-tracker"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        opacity: isActive ? 0.7 : 0,
        width: cursorSize.width,
        height: cursorSize.height,
      }}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 300,
        opacity: { duration: 0.3 },
        width: { duration: 0.3 },
        height: { duration: 0.3 }
      }}
    />
  ) : null
}

export default CursorTracker