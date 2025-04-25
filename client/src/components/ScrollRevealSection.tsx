import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ScrollRevealSectionProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
  delay?: number
  threshold?: number
  distance?: number
  triggerOnce?: boolean
  staggerChildren?: boolean
  staggerDelay?: number
  style?: React.CSSProperties
}

const ScrollRevealSection: React.FC<ScrollRevealSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  duration = 0.6,
  delay = 0,
  threshold = 0.2,
  distance = 50,
  triggerOnce = false,
  staggerChildren = false,
  staggerDelay = 0.1,
  style
}) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold,
    triggerOnce
  })
  
  // Set initial animation states based on direction
  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance }
      case 'down':
        return { opacity: 0, y: -distance }
      case 'left':
        return { opacity: 0, x: distance }
      case 'right':
        return { opacity: 0, x: -distance }
      default:
        return { opacity: 0, y: distance }
    }
  }
  
  // Target animation state
  const targetState = { opacity: 1, x: 0, y: 0 }
  
  // Start animation when in view
  useEffect(() => {
    if (inView) {
      controls.start(targetState)
    }
  }, [controls, inView, targetState])
  
  // Apply staggered animation to children if enabled
  const childVariants = {
    hidden: getInitialState(),
    visible: (i: number) => ({
      ...targetState,
      transition: {
        delay: delay + (staggerChildren ? i * staggerDelay : 0),
        duration,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for a nicer easing
      }
    })
  }
  
  // Create staggered children if needed
  const renderChildren = () => {
    if (!staggerChildren) {
      return children
    }
    
    return React.Children.map(children, (child, i) => {
      if (!React.isValidElement(child)) return child
      
      return (
        <motion.div
          custom={i}
          variants={childVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {child}
        </motion.div>
      )
    })
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={staggerChildren ? "hidden" : getInitialState()}
      animate={staggerChildren ? "visible" : (inView ? targetState : getInitialState())}
      variants={staggerChildren ? { hidden: {}, visible: {} } : undefined}
      transition={
        staggerChildren 
          ? {
              when: "beforeChildren",
              staggerChildren: staggerDelay,
              delayChildren: delay,
            } 
          : { 
              delay, 
              duration, 
              ease: [0.25, 0.1, 0.25, 1]
            }
      }
    >
      {staggerChildren ? renderChildren() : children}
    </motion.div>
  )
}

// A special component for scroll-based parallax effects
export const ScrollParallaxItem: React.FC<{
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: 'vertical' | 'horizontal'
}> = ({ 
  children, 
  speed = 0.3, 
  className = '', 
  direction = 'vertical' 
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'vertical' ? [100 * speed, -100 * speed] : [0, 0]
  )
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'horizontal' ? [100 * speed, -100 * speed] : [0, 0]
  )
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, x }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ScrollRevealSection