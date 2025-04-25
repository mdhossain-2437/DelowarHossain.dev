import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, X, Bot, Code, ChevronDown, ChevronUp, Copy, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { userData } from '@/data/portfolioData'
import { typewriter, debounce } from '@/lib/utils'

// Define types
interface Message {
  type: 'ai' | 'user'
  content: string
  timestamp: Date
}

interface PresetResponse {
  key: string
  trigger: string[]
  response: string
}

const AIAssistant: React.FC = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const welcomeCompletedRef = useRef(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  // Welcome message that appears with a typing animation
  const welcomeMessage = `Hi there! I'm ${userData.name}'s virtual assistant. I can answer questions about his skills, experience, and projects. How can I help you today?`
  
  // Preset responses for common questions
  const presetResponses: PresetResponse[] = [
    {
      key: 'skills',
      trigger: ['skills', 'technologies', 'tech stack', 'what can you do', 'what do you know'],
      response: `${userData.name} is proficient in the following technologies:\n\n- Frontend: React.js, Next.js, TypeScript, Tailwind CSS\n- Backend: Node.js, Express\n- Database: PostgreSQL, MongoDB\n- Other: Git, CI/CD, REST APIs, GraphQL`
    },
    {
      key: 'experience',
      trigger: ['experience', 'work history', 'background', 'portfolio'],
      response: `${userData.name} has over 3 years of experience in web development. Some of his notable experience includes:\n\n1. Building responsive web applications with React\n2. Developing REST APIs with Node.js and Express\n3. Working with databases like PostgreSQL and MongoDB\n4. Implementing modern UI designs with Tailwind CSS and animations`
    },
    {
      key: 'education',
      trigger: ['education', 'university', 'degree', 'college', 'school'],
      response: `${userData.name} is currently pursuing a degree in Computer Science. He's also self-taught in many areas of web development, constantly learning through online courses, documentation, and building projects.`
    },
    {
      key: 'contact',
      trigger: ['contact', 'email', 'phone', 'reach', 'hire', 'connect'],
      response: `You can contact ${userData.name} through:\n\n- Email: ${userData.email}\n- LinkedIn: ${userData.socialLinks.linkedin}\n- GitHub: ${userData.socialLinks.github}\n\nHe's currently available for freelance work and project collaborations.`
    },
    {
      key: 'projects',
      trigger: ['projects', 'portfolio', 'work', 'examples'],
      response: `${userData.name} has worked on several projects, including:\n\n1. An e-commerce platform with React, Node.js, and MongoDB\n2. A real-time chat application using WebSockets\n3. A task management system with authentication and permission controls\n4. Multiple landing pages and business websites for clients\n\nCheck out the Projects section on this website for more details and live demos.`
    }
  ]
  
  // Listen for shortcut keys to open/close the assistant
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(prev => !prev)
        if (!isOpen) setIsMinimized(false)
      }
      
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])
  
  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  
  // Display welcome message with typewriter effect on first open
  useEffect(() => {
    if (isOpen && !welcomeCompletedRef.current && messages.length === 0) {
      welcomeCompletedRef.current = true
      
      setIsTyping(true)
      setTimeout(() => {
        const newMessage: Message = {
          type: 'ai',
          content: welcomeMessage,
          timestamp: new Date()
        }
        setMessages([newMessage])
        setIsTyping(false)
      }, 1000)
    }
    
    if (isOpen && !isMinimized && inputRef.current) {
      // Focus on input when opened
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen, isMinimized, messages.length])
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return
    
    // Add user message
    const newUserMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newUserMessage])
    setInput('')
    setIsTyping(true)
    
    // Simulate response delay for realism
    setTimeout(() => {
      let botResponse = generateResponse(input)
      
      // Add AI response
      const newAIMessage: Message = {
        type: 'ai',
        content: botResponse,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, newAIMessage])
      setIsTyping(false)
    }, 1500)
  }
  
  // Generate AI response based on user input
  const generateResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase()
    
    // Check for preset responses
    for (const preset of presetResponses) {
      for (const trigger of preset.trigger) {
        if (lowercaseInput.includes(trigger)) {
          return preset.response
        }
      }
    }
    
    // Check for greetings
    if (/^(hi|hello|hey|howdy|greetings)/i.test(lowercaseInput)) {
      return `Hello! How can I help you learn more about ${userData.name} or his work?`
    }
    
    // Check for thanks
    if (/thank(s| you)/i.test(lowercaseInput)) {
      return "You're welcome! Is there anything else you'd like to know about my skills, projects, or experience?"
    }
    
    // Check for bye
    if (/bye|goodbye|see you|farewell/i.test(lowercaseInput)) {
      return "Goodbye! Feel free to reach out again if you have any more questions. Have a great day!"
    }
    
    // Generic response if no preset matches
    return `That's an interesting question about ${userData.name}. He specializes in frontend development with React, TypeScript, and modern CSS frameworks. Would you like to know more about his skills, projects, or experience?`
  }
  
  // Copy message to clipboard
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    
    setTimeout(() => {
      setCopiedIndex(null)
    }, 2000)
  }
  
  // Format code blocks in messages
  const formatMessage = (content: string) => {
    // Split by code blocks
    const parts = content.split(/(\`\`\`[\s\S]*?\`\`\`)/g)
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract code and language
        const code = part.slice(3, -3)
        const firstLineEnd = code.indexOf('\n')
        const language = firstLineEnd > 0 ? code.slice(0, firstLineEnd).trim() : ''
        const codeContent = firstLineEnd > 0 ? code.slice(firstLineEnd + 1) : code
        
        return (
          <div key={index} className="my-2 rounded-md overflow-hidden bg-gray-900 font-mono text-sm relative">
            {language && (
              <div className="bg-gray-800 px-4 py-1 text-xs text-gray-400 border-b border-gray-700">
                {language}
              </div>
            )}
            <pre className="p-4 overflow-x-auto">
              <code>{codeContent}</code>
            </pre>
          </div>
        )
      } else if (part.includes('\n')) {
        // Handle regular text with new lines
        return (
          <div key={index}>
            {part.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < part.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        )
      } else {
        // Regular text
        return <span key={index}>{part}</span>
      }
    })
  }
  
  // Button variants
  const buttonVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }
    },
    exit: { 
      scale: 0,
      transition: { duration: 0.2 }
    }
  }
  
  // Chat container variants
  const chatVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    }
  }
  
  // Minimized chat variants
  const minimizedVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20 
      }
    },
    exit: { 
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  }
  
  // Floating button to open the assistant
  const FloatingButton = () => (
    <motion.button
      onClick={() => {
        setIsOpen(true)
        setIsMinimized(false)
      }}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center text-white z-50"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Bot className="w-6 h-6" />
    </motion.button>
  )
  
  // Minimized chat view
  const MinimizedChat = () => (
    <motion.div
      className="fixed bottom-6 right-6 p-3 rounded-full bg-primary shadow-lg flex items-center text-white z-50 cursor-pointer"
      onClick={() => setIsMinimized(false)}
      variants={minimizedVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.05 }}
    >
      <Bot className="w-6 h-6 mr-2" />
      <span className="font-medium">AI Assistant</span>
      <div className="w-2 h-2 rounded-full bg-green-400 ml-2 animate-pulse"></div>
    </motion.div>
  )
  
  // Full chat interface
  const ChatInterface = () => (
    <motion.div
      className="fixed bottom-6 right-6 w-80 md:w-96 bg-dark-900 rounded-xl shadow-xl z-50 flex flex-col overflow-hidden border border-primary/20"
      variants={chatVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Chat header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border-b border-primary/10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-white">AI Assistant</h3>
            <p className="text-xs text-white/60">Ask me anything about {userData.name}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 hover:bg-primary/20 rounded-full mr-1 transition-colors text-white/70 hover:text-white"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-primary/20 rounded-full transition-colors text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Chat messages */}
      <ScrollArea className="flex-1 h-80 chat-messages p-4" ref={scrollAreaRef}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
          >
            <div className="flex">
              {message.type === 'ai' && (
                <div className="flex-shrink-0 mr-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                </div>
              )}
              
              <div
                className={`relative group ${
                  message.type === 'user' 
                    ? 'bg-primary/20 text-white ml-10' 
                    : 'bg-dark-800 text-white'
                } p-3 rounded-xl max-w-[85%]`}
              >
                <div className="text-sm whitespace-pre-wrap">
                  {formatMessage(message.content)}
                </div>
                
                <div className="text-xs text-white/40 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                {message.type === 'ai' && (
                  <button
                    onClick={() => copyToClipboard(message.content, index)}
                    className="absolute -right-5 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/60 hover:text-white" />
                    )}
                  </button>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="flex-shrink-0 ml-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold overflow-hidden">
                    {userData.name.charAt(0)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex mb-4">
            <div className="flex-shrink-0 mr-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            </div>
            
            <div className="bg-dark-800 p-3 rounded-xl max-w-[85%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </ScrollArea>
      
      {/* Chat input */}
      <div className="p-3 border-t border-primary/10 bg-dark-800/50">
        <div className="relative">
          <Textarea 
            ref={inputRef}
            placeholder="Ask something about me..."
            className="resize-none bg-dark-900 border-primary/20 focus-visible:ring-primary focus-visible:ring-opacity-30 min-h-[60px] py-3 pr-12 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            size="icon" 
            className={`absolute right-2 bottom-2 h-8 w-8 rounded-full ${
              !input.trim() || isTyping ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'
            }`}
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick suggestion chips */}
        <div className="flex flex-wrap gap-2 mt-2">
          <button 
            className="text-xs bg-primary/20 text-primary hover:bg-primary/30 px-2 py-1 rounded-full transition-colors"
            onClick={() => setInput("What skills do you have?")}
          >
            Skills
          </button>
          <button 
            className="text-xs bg-primary/20 text-primary hover:bg-primary/30 px-2 py-1 rounded-full transition-colors"
            onClick={() => setInput("Tell me about your projects")}
          >
            Projects
          </button>
          <button 
            className="text-xs bg-primary/20 text-primary hover:bg-primary/30 px-2 py-1 rounded-full transition-colors"
            onClick={() => setInput("How can I contact you?")}
          >
            Contact
          </button>
          <button 
            className="text-xs bg-primary/20 text-primary hover:bg-primary/30 px-2 py-1 rounded-full transition-colors"
            onClick={() => setInput("What's your experience?")}
          >
            Experience
          </button>
        </div>
        
        <div className="text-xs text-white/40 mt-2 text-center">
          Press <kbd className="px-1 py-0.5 bg-dark-700 rounded">Esc</kbd> to close or <kbd className="px-1 py-0.5 bg-dark-700 rounded">Ctrl</kbd> + <kbd className="px-1 py-0.5 bg-dark-700 rounded">/</kbd> to toggle
        </div>
      </div>
    </motion.div>
  )
  
  return (
    <>
      <AnimatePresence>
        {!isOpen && <FloatingButton key="floating-button" />}
        {isOpen && isMinimized && <MinimizedChat key="minimized-chat" />}
        {isOpen && !isMinimized && <ChatInterface key="full-chat" />}
      </AnimatePresence>
    </>
  )
}

export default AIAssistant