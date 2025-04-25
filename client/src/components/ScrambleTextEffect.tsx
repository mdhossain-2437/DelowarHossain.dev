import React, { useEffect, useRef } from 'react'
import ScrambleText from 'scramble-text'

interface ScrambleTextEffectProps {
  text: string
  className?: string
  hoverEffect?: boolean
  speed?: number
  autoStart?: boolean
}

const ScrambleTextEffect: React.FC<ScrambleTextEffectProps> = ({
  text,
  className = '',
  hoverEffect = true,
  speed = 0.5,
  autoStart = false
}) => {
  const textRef = useRef<HTMLDivElement>(null)
  const scrambleInstance = useRef<any>(null)
  
  useEffect(() => {
    if (!textRef.current) return
    
    scrambleInstance.current = new ScrambleText(textRef.current, {
      timeOffset: speed,
      chars: '!<>-_\\/[]{}—=+*^?#_$%@&',
      afterComplete: () => {
        // Optionally do something after scramble complete
      }
    })
    
    if (autoStart) {
      scrambleInstance.current.start()
    }
    
    return () => {
      if (scrambleInstance.current) {
        scrambleInstance.current.stop()
      }
    }
  }, [text, speed, autoStart])
  
  useEffect(() => {
    const element = textRef.current
    if (!element || !hoverEffect) return
    
    const handleMouseEnter = () => {
      if (scrambleInstance.current) {
        scrambleInstance.current.start()
      }
    }
    
    const handleMouseLeave = () => {
      if (scrambleInstance.current) {
        scrambleInstance.current.stop()
      }
    }
    
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hoverEffect])
  
  return (
    <div 
      ref={textRef} 
      className={`inline cursor-default ${className}`}
      data-text={text}
    >
      {text}
    </div>
  )
}

export default ScrambleTextEffect