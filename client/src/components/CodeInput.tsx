import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Terminal, SendHorizonal, ArrowRight } from 'lucide-react'

interface CodeInputProps {
  placeholder?: string
  onSubmit?: (value: string) => void
  className?: string
  prefix?: string
  buttonText?: string
  showIcon?: boolean
}

const CodeInput: React.FC<CodeInputProps> = ({
  placeholder = 'Type your message...',
  onSubmit,
  className = '',
  prefix = '$',
  buttonText = 'Send',
  showIcon = true
}) => {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && onSubmit) {
      onSubmit(value)
      setValue('')
    }
  }
  
  // Simulate blinking cursor effect
  const [cursorVisible, setCursorVisible] = useState(true)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 530)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <motion.form 
      className={`bg-dark-900/50 border border-primary/10 rounded-xl relative overflow-hidden ${className}`}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Terminal header */}
      <div className="py-1 px-3 bg-dark-900/80 border-b border-primary/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white/40 text-xs font-code">terminal@delowar:~</div>
        <div className="w-4"></div> {/* Spacer for alignment */}
      </div>
      
      {/* Input container */}
      <div className="flex items-center px-3 py-2">
        <span className="text-primary mr-2 font-code">{prefix}</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent border-none outline-none text-white/90 font-code"
            placeholder={placeholder}
          />
          
          {/* Simulated blinking cursor when empty and focused */}
          {value === '' && isFocused && cursorVisible && (
            <span className="absolute left-0 top-0 h-full w-[1px] bg-white/80"></span>
          )}
        </div>
        
        <motion.button
          type="submit"
          className="ml-2 py-1 px-3 bg-primary/10 text-primary rounded-md font-code text-sm hover:bg-primary/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!value.trim()}
        >
          {showIcon ? (
            <SendHorizonal className="w-4 h-4" />
          ) : (
            <span className="flex items-center">
              {buttonText} <ArrowRight className="w-3 h-3 ml-1" />
            </span>
          )}
        </motion.button>
      </div>
      
      {/* Optional syntax highlighting for special words */}
      <div className="absolute inset-0 pointer-events-none opacity-0">
        <div className="font-code text-green-400">function</div>
        <div className="font-code text-blue-400">const</div>
        <div className="font-code text-yellow-400">import</div>
      </div>
    </motion.form>
  )
}

export default CodeInput