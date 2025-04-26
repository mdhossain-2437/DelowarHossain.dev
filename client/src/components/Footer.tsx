import React from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 overflow-hidden bg-dark-900/80 border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-space font-bold text-white">DH</span>
              </div>
              <span className="font-space font-medium text-xl ml-3 text-white">Delowar Hossain</span>
            </div>
            
            <div className="flex space-x-8 mb-6 md:mb-0">
              <a href="#home" className="text-white/70 hover:text-white transition-colors">Home</a>
              <a href="#skills" className="text-white/70 hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="text-white/70 hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://github.com/mdhossain-2437" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-700 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mdhossain2437" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-700 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/mdhossain2437" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-700 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="border-t border-primary/10 mt-8 pt-8 text-center">
            <p className="text-white/60">&copy; {new Date().getFullYear()} MD Delowar Hossain. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
