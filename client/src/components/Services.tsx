import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Layout, Code, Plug, Smartphone, Palette, GitBranch } from 'lucide-react'

type Service = {
  icon: React.ReactNode
  title: string
  description: string
  tools: string[]
}

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  })

  const services: Service[] = [
    {
      icon: <Layout className="w-7 h-7 text-primary" />,
      title: 'Custom UI Design',
      description: 'Create visually appealing and intuitive user interfaces that engage visitors and improve usability.',
      tools: ['Figma', 'Adobe XD', 'Prototyping']
    },
    {
      icon: <Code className="w-7 h-7 text-primary" />,
      title: 'Frontend Development',
      description: 'Build responsive, interactive, and high-performance websites and web applications with modern technologies.',
      tools: ['HTML5', 'CSS3', 'JavaScript', 'React']
    },
    {
      icon: <Plug className="w-7 h-7 text-primary" />,
      title: 'REST API Integration',
      description: 'Connect your frontend to backend services by implementing seamless API integrations for data exchange.',
      tools: ['REST API', 'JSON', 'Fetch', 'Axios']
    },
    {
      icon: <Smartphone className="w-7 h-7 text-primary" />,
      title: 'Responsive Layout',
      description: 'Ensure your website looks and functions perfectly across all devices and screen sizes.',
      tools: ['Mobile-first', 'Tailwind CSS', 'Bootstrap', 'Flexbox']
    },
    {
      icon: <Palette className="w-7 h-7 text-primary" />,
      title: 'Modern UI Styling',
      description: 'Implement sleek, modern aesthetics with CSS frameworks for visually stunning, maintainable designs.',
      tools: ['Tailwind CSS', 'CSS3', 'Animations']
    },
    {
      icon: <GitBranch className="w-7 h-7 text-primary" />,
      title: 'Version Control',
      description: 'Manage code changes efficiently and collaborate effectively with Git and GitHub.',
      tools: ['Git', 'GitHub', 'Branching']
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden bg-dark-900/80">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            ref={ref}
          >
            <h2 className="font-space text-3xl md:text-4xl font-bold mb-4">Services I Offer</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Here's how I can help bring your web projects to life with precision and creativity.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={container}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="glass-card p-6 rounded-2xl hover:glow transition-all cursor-pointer group"
                variants={item}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/30 transition-all">
                  {service.icon}
                </div>
                <h3 className="font-space text-xl font-medium mb-3 group-hover:text-secondary transition-all">
                  {service.title}
                </h3>
                <p className="text-white/70 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.tools.map((tool, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-dark-700 text-xs text-white/70">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Services
