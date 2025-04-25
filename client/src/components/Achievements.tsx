import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Code, Bookmark, Trophy, BookOpen, Briefcase, Crown, CheckCircle, Plus, Medal, GraduationCap } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import ScrollRevealSection from './ScrollRevealSection'
import { Button } from '@/components/ui/button'

// Define types for our achievements data
interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  date: string
  category: 'award' | 'certificate' | 'recognition' | 'hackathon'
  link?: string
  color: string
}

const Achievements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  })
  
  // Achievements data
  const achievements: Achievement[] = [
    {
      id: 'a1',
      title: 'Best Frontend Developer Award',
      description: 'Recognized for exceptional UI/UX implementation and performance optimization in web applications',
      icon: <Trophy className="w-6 h-6" />,
      date: 'May 2024',
      category: 'award',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: 'a2',
      title: 'React.js Expert Certification',
      description: 'Advanced certification in React.js development covering hooks, context API, and performance optimization techniques',
      icon: <GraduationCap className="w-6 h-6" />,
      date: 'February 2024',
      category: 'certificate',
      link: '#',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'a3',
      title: 'AI Integration Hackathon Winner',
      description: 'First place in hackathon for building an AI-powered web application that enhances user experience',
      icon: <Award className="w-6 h-6" />,
      date: 'December 2023',
      category: 'hackathon',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'a4',
      title: 'Featured Developer on Dev.to',
      description: 'Recognized for contributions to web development community through technical articles and code solutions',
      icon: <BookOpen className="w-6 h-6" />,
      date: 'October 2023',
      category: 'recognition',
      link: '#',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'a5',
      title: 'Tailwind CSS Mastery Certification',
      description: 'Comprehensive certification in advanced Tailwind CSS techniques and best practices',
      icon: <Medal className="w-6 h-6" />,
      date: 'July 2023',
      category: 'certificate',
      color: 'from-sky-500 to-blue-600'
    },
    {
      id: 'a6',
      title: 'Top Contributor - Open Source Project',
      description: 'Recognized as a top contributor to a popular open-source React component library',
      icon: <Crown className="w-6 h-6" />,
      date: 'May 2023',
      category: 'recognition',
      color: 'from-rose-500 to-pink-600'
    }
  ]
  
  // Filter achievements based on selected category
  const filteredAchievements = selectedCategory 
    ? achievements.filter(a => a.category === selectedCategory) 
    : achievements
  
  // Category filters
  const categories = [
    { id: 'all', label: 'All', icon: <Plus className="w-4 h-4" /> },
    { id: 'award', label: 'Awards', icon: <Trophy className="w-4 h-4" /> },
    { id: 'certificate', label: 'Certifications', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'recognition', label: 'Recognition', icon: <Crown className="w-4 h-4" /> },
    { id: 'hackathon', label: 'Hackathons', icon: <Code className="w-4 h-4" /> }
  ]
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  }
  
  // Fun facts section (as requested)
  const funFacts = [
    "Started coding with zero CS background",
    "Self-taught programmer through online resources",
    "Built 20+ projects to practice new skills",
    "Transitioned from a non-tech field to development"
  ]

  return (
    <section id="achievements" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-dark-900/80 backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-dark-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-dark-900 to-transparent"></div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <ScrollRevealSection>
            <div className="text-center mb-12 md:mb-16">
              <motion.div className="inline-block mb-4">
                <div className="bg-primary/10 backdrop-blur-sm p-2 rounded-full inline-block">
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
              </motion.div>
              
              <motion.h2 
                className="font-space text-3xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
                  Achievements
                </span> & Recognition
              </motion.h2>
              
              <motion.p 
                className="text-white/70 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Milestones, certifications, and recognition in my development journey
              </motion.p>
            </div>
          </ScrollRevealSection>
          
          {/* Category filters */}
          <ScrollRevealSection>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id || (category.id === 'all' && !selectedCategory) ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full ${
                    selectedCategory === category.id || (category.id === 'all' && !selectedCategory)
                      ? 'bg-primary text-white'
                      : 'bg-dark-800 text-white/70 hover:text-white border-primary/20'
                  }`}
                  onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
                >
                  <span className="flex items-center">
                    {category.icon}
                    <span className="ml-2">{category.label}</span>
                  </span>
                </Button>
              ))}
            </div>
          </ScrollRevealSection>
          
          {/* Achievements grid */}
          <ScrollRevealSection staggerChildren>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              ref={ref}
            >
              {filteredAchievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className="glass rounded-xl border border-primary/10 overflow-hidden hover:border-primary/30 transition-all duration-300 group"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className={`h-2 bg-gradient-to-r ${achievement.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center`}>
                        {achievement.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-space font-bold text-lg text-white mb-2">
                            {achievement.title}
                          </h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/90">
                            {achievement.date}
                          </span>
                        </div>
                        
                        <p className="text-white/70 text-sm mb-3">
                          {achievement.description}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xs px-2 py-1 rounded-full bg-dark-700 text-white/60 capitalize">
                            {achievement.category}
                          </span>
                          
                          {achievement.link && (
                            <motion.a
                              href={achievement.link}
                              className="text-primary text-sm flex items-center"
                              whileHover={{ x: 3 }}
                            >
                              View Details
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                <path d="M5 12h14"/>
                                <path d="m12 5 7 7-7 7"/>
                              </svg>
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollRevealSection>
          
          {/* Fun facts section */}
          <ScrollRevealSection>
            <div className="mt-20 p-8 glass rounded-2xl border border-primary/20">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-space font-bold text-2xl text-white">Fun Facts</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-xl bg-dark-800/50 border border-primary/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ x: 5 }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                    <p className="text-white/80">{fact}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <p className="text-white/80 text-center italic">
                  "The journey from a non-CS background to web development has been challenging but incredibly rewarding. It's proof that with dedication and continuous learning, anyone can master new skills and excel in tech."
                </p>
              </div>
            </div>
          </ScrollRevealSection>
        </div>
      </div>
    </section>
  )
}

export default Achievements