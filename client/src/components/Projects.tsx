import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, GitPullRequest, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Project = {
  image: string
  title: string
  description: string
  technologies: string[]
  features: string[]
  liveLink: string
  githubLink: string
  isReversed?: boolean
}

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  })

  const projects: Project[] = [
    {
      image: "https://source.unsplash.com/user/erondu/800x600?tech,web",
      title: "Portfolio Website",
      description: "A fully responsive and modern portfolio website to showcase my skills and projects. Features clean design, smooth animations, and mobile-friendly layout.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      features: ["Responsive Design", "Modern UI", "Bootstrap"],
      liveLink: "#",
      githubLink: "#"
    },
    {
      image: "https://source.unsplash.com/user/erondu/800x600?product,web",
      title: "Product Landing Page",
      description: "A visually appealing product landing page with smooth animations and a mobile-friendly design. Focuses on conversion optimization and user experience.",
      technologies: ["HTML", "Tailwind CSS", "JavaScript"],
      features: ["Tailwind CSS", "Animations", "Mobile-friendly"],
      liveLink: "#",
      githubLink: "#",
      isReversed: true
    },
    {
      image: "https://source.unsplash.com/user/erondu/800x600?weather,app",
      title: "Weather Application",
      description: "A weather application that fetches real-time weather data using an API and displays it in an interactive UI. Features location-based weather and forecasts.",
      technologies: ["HTML", "CSS", "JavaScript", "API"],
      features: ["REST API", "JavaScript", "Dynamic UI"],
      liveLink: "#",
      githubLink: "#"
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <h2 className="font-space text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explore my recent web development projects showcasing my skills and expertise.
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-16"
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="glass mb-16 rounded-2xl overflow-hidden"
                variants={item}
              >
                <div className={`flex flex-col ${project.isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                  <div className="lg:w-1/2">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4 flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <div key={i} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs mr-2">
                            {tech}
                          </div>
                        ))}
                      </div>
                      <h3 className="font-space text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                      <p className="text-white/70 mb-6">{project.description}</p>
                      
                      <div className="flex items-center space-x-4 mb-6 flex-wrap">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex items-center mt-2 mr-4">
                            <CheckCircle className="w-4 h-4 text-success mr-2" />
                            <span className="text-white/70 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button variant="gradient" size="pill" asChild>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          <span className="font-space font-medium">Live Demo</span>
                        </a>
                      </Button>
                      <Button variant="glass" size="pill" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <GitPullRequest className="w-4 h-4 mr-2" />
                          <span className="font-space font-medium">GitPullRequest</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button variant="glass" size="lg-pill" asChild>
              <a href="#" className="inline-flex items-center">
                <span className="font-space font-medium mr-2">View All Projects</span>
                <span className="i-lucide-arrow-right w-5 h-5"></span>
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Projects
