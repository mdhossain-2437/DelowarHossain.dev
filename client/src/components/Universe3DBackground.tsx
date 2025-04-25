import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// This component creates a 3D universe-like background using CSS and JavaScript
// No heavy 3D libraries required, which helps with performance
const Universe3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const stars = useRef<HTMLDivElement[]>([])
  
  // Create 3D stars with depth and parallax effect
  useEffect(() => {
    if (!containerRef.current) return
    
    // Clean up any existing stars
    stars.current.forEach(star => star.remove())
    stars.current = []
    
    // Create new stars
    const numStars = 100
    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div')
      
      // Random position
      const x = Math.random() * containerRect.width
      const y = Math.random() * containerRect.height
      const z = Math.random() * 1000 - 500
      
      // Size based on z-depth (further away = smaller)
      const size = Math.max(0.5, Math.random() * 2 * (1000 - Math.abs(z)) / 1000)
      
      // Style the star
      star.style.position = 'absolute'
      star.style.left = `${x}px`
      star.style.top = `${y}px`
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.backgroundColor = '#ffffff'
      star.style.borderRadius = '50%'
      star.style.opacity = `${Math.random() * 0.7 + 0.3}`
      star.style.transform = `translateZ(${z}px)`
      
      // Add animation with random duration
      star.style.animation = `starTwinkle ${3 + Math.random() * 4}s infinite alternate`
      
      // Add to DOM and keep reference
      container.appendChild(star)
      stars.current.push(star)
    }
    
    // Add parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const centerX = containerRect.width / 2
      const centerY = containerRect.height / 2
      
      const deltaX = (e.clientX - containerRect.left - centerX) / 20
      const deltaY = (e.clientY - containerRect.top - centerY) / 20
      
      stars.current.forEach(star => {
        const z = parseFloat(star.style.transform.replace('translateZ(', '').replace('px)', ''))
        const depth = (1000 - Math.abs(z)) / 1000 // Depth factor (0-1)
        
        const moveX = -deltaX * depth * 2
        const moveY = -deltaY * depth * 2
        
        star.style.transform = `translateZ(${z}px) translate(${moveX}px, ${moveY}px)`
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      stars.current.forEach(star => star.remove())
    }
  }, [])
  
  // Generate "nebula" effects - colorful gradient blobs
  const nebulae = [
    {
      position: { top: '10%', left: '20%' },
      size: { width: '300px', height: '300px' },
      colors: 'from-primary/20 to-transparent',
      blur: 'blur-3xl',
      animation: {
        y: [0, -30, 0],
        opacity: [0.4, 0.6, 0.4],
        scale: [1, 1.1, 1],
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
      }
    },
    {
      position: { bottom: '15%', right: '10%' },
      size: { width: '400px', height: '400px' },
      colors: 'from-secondary/20 to-transparent',
      blur: 'blur-3xl',
      animation: {
        y: [0, 20, 0],
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.05, 1],
        transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
      }
    },
    {
      position: { top: '40%', right: '25%' },
      size: { width: '350px', height: '350px' },
      colors: 'from-purple-500/10 to-transparent',
      blur: 'blur-3xl',
      animation: {
        y: [0, -15, 0],
        opacity: [0.3, 0.4, 0.3],
        scale: [1, 1.08, 1],
        transition: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }
      }
    }
  ]
  
  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0 perspective-1000" 
      ref={containerRef}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Nebula glows */}
      {nebulae.map((nebula, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-radial ${nebula.colors} ${nebula.blur} opacity-50`}
          style={{
            ...nebula.position,
            ...nebula.size
          }}
          animate={{
            ...nebula.animation
          }}
        />
      ))}
      
      {/* Add subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      {/* Add custom CSS animation for the stars */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes starTwinkle {
            0% {
              opacity: 0.3;
              box-shadow: 0 0 0 rgba(255, 255, 255, 0);
            }
            100% {
              opacity: 0.8;
              box-shadow: 0 0 4px rgba(255, 255, 255, 0.3);
            }
          }
        `
      }} />
    </div>
  )
}

export default Universe3DBackground