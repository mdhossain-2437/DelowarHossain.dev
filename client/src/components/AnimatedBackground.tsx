import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const interactionRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create blobs with improved design
    interface Blob {
      x: number
      y: number
      initialX: number
      initialY: number
      radius: number
      maxRadius: number
      vx: number
      vy: number
      color: string
      opacity: number
      growFactor: number
    }

    const createBlob = (): Blob => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 100 + 100
      const isViolet = Math.random() < 0.7
      
      return {
        x,
        y,
        initialX: x,
        initialY: y,
        radius,
        maxRadius: radius * 1.5,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
        color: isViolet 
          ? 'rgba(109, 40, 217, 0.08)' 
          : Math.random() < 0.5 
            ? 'rgba(139, 92, 246, 0.06)' 
            : 'rgba(16, 185, 129, 0.05)',
        opacity: Math.random() * 0.12 + 0.03,
        growFactor: Math.random() * 0.2 + 0.8
      }
    }

    // Create grid points for interactive background
    interface GridPoint {
      x: number
      y: number
      originalX: number
      originalY: number
      size: number
      originalSize: number
      color: string
      alpha: number
      maxAlpha: number
    }

    const gridPoints: GridPoint[] = []
    const gridSize = Math.max(Math.floor(canvas.width / 80), 10)
    const cellWidth = canvas.width / gridSize
    const cellHeight = canvas.height / gridSize

    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        const isSpecial = Math.random() < 0.1
        
        gridPoints.push({
          x: i * cellWidth,
          y: j * cellHeight,
          originalX: i * cellWidth,
          originalY: j * cellHeight,
          size: isSpecial ? 2 : Math.random() < 0.25 ? 1.5 : 1,
          originalSize: isSpecial ? 2 : Math.random() < 0.25 ? 1.5 : 1,
          color: Math.random() < 0.7 ? '#6d28d9' : Math.random() < 0.5 ? '#8b5cf6' : '#10b981',
          alpha: Math.random() * 0.2,
          maxAlpha: Math.random() * 0.6 + 0.2
        })
      }
    }

    const blobs: Blob[] = []
    for (let i = 0; i < 8; i++) {
      blobs.push(createBlob())
    }

    // Handle mouse movement for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
      interactionRef.current = true
      
      // Reset the interaction flag after a delay
      setTimeout(() => {
        interactionRef.current = false
      }, 100)
    }

    // Handle touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        })
        interactionRef.current = true
      }
      
      // Reset the interaction flag after a delay
      setTimeout(() => {
        interactionRef.current = false
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    // Enhanced animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw grid points with interactive effects
      for (let point of gridPoints) {
        // Calculate distance from mouse
        const dx = mousePosition.x - point.x
        const dy = mousePosition.y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 250
        
        if (distance < maxDistance && interactionRef.current) {
          // Move points away from mouse
          const angle = Math.atan2(dy, dx)
          const pushStrength = (1 - distance / maxDistance) * 15
          
          gsap.to(point, {
            x: point.originalX - Math.cos(angle) * pushStrength,
            y: point.originalY - Math.sin(angle) * pushStrength,
            size: point.originalSize * (1 + (1 - distance / maxDistance) * 2),
            alpha: point.maxAlpha,
            duration: 0.3
          })
        } else {
          // Return to original position
          gsap.to(point, {
            x: point.originalX,
            y: point.originalY,
            size: point.originalSize,
            alpha: Math.random() * 0.2,
            duration: 1
          })
        }
        
        // Draw the point
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        ctx.fillStyle = point.color.replace(')', `, ${point.alpha})`)
          .replace('rgb', 'rgba')
        ctx.fill()
      }
      
      // Draw animated blobs with interactive effects
      for (let blob of blobs) {
        blob.x += blob.vx
        blob.y += blob.vy
        
        if (blob.x < 0 || blob.x > canvas.width) blob.vx = -blob.vx
        if (blob.y < 0 || blob.y > canvas.height) blob.vy = -blob.vy
        
        // Calculate distance from mouse
        const dx = mousePosition.x - blob.x
        const dy = mousePosition.y - blob.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 400
        
        if (distance < maxDistance && interactionRef.current) {
          // Grow and increase opacity when close to mouse
          const growFactor = (1 - distance / maxDistance) * blob.growFactor
          const newRadius = blob.radius + blob.radius * growFactor
          
          // Don't let it grow too large
          blob.radius = Math.min(newRadius, blob.maxRadius)
          
          // Boost opacity
          blob.opacity = Math.min(blob.opacity * 1.05, 0.3)
        } else {
          // Shrink back to normal
          blob.radius = blob.radius * 0.995 + blob.radius * 0.005
          blob.opacity = blob.opacity * 0.95 + 0.03 * 0.05
        }
        
        // Draw a gradient blob for more realistic effect
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        )
        
        // Convert color format for gradient
        const baseColor = blob.color.replace('rgba', '').replace('(', '').replace(')', '').split(',')
        const r = baseColor[0].trim()
        const g = baseColor[1].trim()
        const b = baseColor[2].trim()
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${blob.opacity * 1.5})`)
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${blob.opacity * 0.8})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
      
      requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  return (
    <>
      <canvas 
        id="animated-bg" 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-[-1]" 
      />
    </>
  )
}

export default AnimatedBackground
