import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { apiRequest } from '@/lib/queryClient'
import { useToast } from '@/hooks/use-toast'

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  })

  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields."
      })
      return
    }
    
    try {
      setIsSubmitting(true)
      
      // In a real implementation, this would send the form data to a server
      // For demo, we'll just simulate the API call
      toast({
        title: "Message Sent",
        description: "Thanks for your message. I'll get back to you soon!",
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem sending your message. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <h2 className="font-space text-3xl md:text-4xl font-bold mb-4">Need a dev who codes like an AI?</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              I'm ready to help build your next web project with precision and creativity.
            </p>
          </motion.div>
          
          <motion.div 
            className="glass p-8 rounded-2xl glow"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <motion.div 
                className="md:w-2/5"
                variants={itemVariants}
              >
                <h3 className="font-space text-2xl font-bold mb-6">Let's Connect</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a 
                        href="mailto:mdhossain2437@gmail.com" 
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        mdhossain2437@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <a 
                        href="tel:+8801315123134" 
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        +880 1315 123134
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-white/70">Bangladesh</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="font-medium mb-3">Social Media</h4>
                    <div className="flex space-x-4">
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-dark-700 hover:bg-primary/20 flex items-center justify-center transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-dark-700 hover:bg-primary/20 flex items-center justify-center transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a 
                        href="#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-dark-700 hover:bg-primary/20 flex items-center justify-center transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-3/5"
                variants={itemVariants}
              >
                <h3 className="font-space text-2xl font-bold mb-6">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Code-style terminal input for name */}
                  <div className="bg-dark-900/50 border border-primary/10 rounded-xl overflow-hidden">
                    <div className="py-1 px-3 bg-dark-900/80 border-b border-primary/10 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-white/40 text-xs font-code">name.js</div>
                      <div className="w-4"></div> {/* Spacer for alignment */}
                    </div>
                    <div className="flex items-center px-3 py-2">
                      <span className="text-primary mr-2 font-code">const</span>
                      <span className="text-blue-400 mr-2 font-code">name</span>
                      <span className="text-white mr-2 font-code">=</span>
                      <div className="flex-1">
                        <input 
                          type="text" 
                          id="name" 
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-transparent border-none outline-none text-yellow-300 font-code"
                          placeholder="'Your Name'" 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Code-style terminal input for email */}
                  <div className="bg-dark-900/50 border border-primary/10 rounded-xl overflow-hidden">
                    <div className="py-1 px-3 bg-dark-900/80 border-b border-primary/10 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-white/40 text-xs font-code">email.js</div>
                      <div className="w-4"></div>
                    </div>
                    <div className="flex items-center px-3 py-2">
                      <span className="text-primary mr-2 font-code">const</span>
                      <span className="text-blue-400 mr-2 font-code">email</span>
                      <span className="text-white mr-2 font-code">=</span>
                      <div className="flex-1">
                        <input 
                          type="email" 
                          id="email" 
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-transparent border-none outline-none text-yellow-300 font-code"
                          placeholder="'your.email@example.com'" 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Code-style terminal input for subject */}
                  <div className="bg-dark-900/50 border border-primary/10 rounded-xl overflow-hidden">
                    <div className="py-1 px-3 bg-dark-900/80 border-b border-primary/10 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-white/40 text-xs font-code">subject.js</div>
                      <div className="w-4"></div>
                    </div>
                    <div className="flex items-center px-3 py-2">
                      <span className="text-primary mr-2 font-code">const</span>
                      <span className="text-blue-400 mr-2 font-code">subject</span>
                      <span className="text-white mr-2 font-code">=</span>
                      <div className="flex-1">
                        <input 
                          type="text" 
                          id="subject" 
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-transparent border-none outline-none text-yellow-300 font-code"
                          placeholder="'Project Inquiry'" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Code-style terminal input for message */}
                  <div className="bg-dark-900/50 border border-primary/10 rounded-xl overflow-hidden">
                    <div className="py-1 px-3 bg-dark-900/80 border-b border-primary/10 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-white/40 text-xs font-code">message.js</div>
                      <div className="w-4"></div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-start">
                        <span className="text-primary mr-2 font-code">const</span>
                        <span className="text-blue-400 mr-2 font-code">message</span>
                        <span className="text-white mr-2 font-code">=</span>
                        <span className="text-yellow-300 mr-2 font-code">`</span>
                      </div>
                      <div className="ml-4 mb-1">
                        <textarea 
                          id="message" 
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-transparent border-none outline-none text-green-300 font-code"
                          placeholder="Your message here..." 
                          required
                        />
                      </div>
                      <div className="flex">
                        <span className="text-yellow-300 font-code">`</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Command-line submit button */}
                  <div className="flex items-center bg-dark-900/40 border border-primary/10 rounded-lg px-3 py-2 w-full md:w-auto">
                    <span className="text-primary mr-2 font-code">$</span>
                    <Button 
                      type="submit"
                      variant="default" 
                      size="default"
                      disabled={isSubmitting}
                      className="bg-transparent hover:bg-primary/10 text-white"
                    >
                      <span className="font-code">contact.send()</span>
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                    <span className="animate-pulse ml-1 text-white">▮</span>
                  </div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
