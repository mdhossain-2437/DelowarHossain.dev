import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ChevronLeft, ChevronRight, Quote, Star, ThumbsUp, CheckCircle } from 'lucide-react';
import ScrollRevealSection from './ScrollRevealSection';
import { useInView } from 'react-intersection-observer';

// Define types for testimonial data
interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar: string; // URL for the avatar (will be generated)
  rating: number;
  date: string;
}

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  
  // Testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 't1',
      name: 'Sarah Johnson',
      position: 'Project Manager',
      company: 'TechCorp Inc.',
      content: 'Delowar delivered an exceptional website that exceeded our expectations. His attention to detail and ability to translate our requirements into a beautiful, functional interface was impressive. He was responsive, professional, and went above and beyond to ensure we were satisfied with the final product.',
      avatar: '/avatars/avatar1.png', // These are placeholders - we'll generate avatars programmatically
      rating: 5,
      date: 'March 2024'
    },
    {
      id: 't2',
      name: 'Michael Chen',
      position: 'Founder & CEO',
      company: 'StartupBoost',
      content: 'Working with Delowar was a game-changer for our startup. He built a modern, responsive website that perfectly represents our brand. His technical expertise combined with an eye for design resulted in a product that has significantly improved our online presence and user engagement.',
      avatar: '/avatars/avatar2.png',
      rating: 5,
      date: 'January 2024'
    },
    {
      id: 't3',
      name: 'Priya Patel',
      position: 'Marketing Director',
      company: 'GrowthMarket',
      content: 'Delowar is an exceptional developer who understands both the technical and business aspects of web development. He created a high-performing e-commerce solution that has boosted our sales by 40%. His communication was clear throughout the project, and he delivered on time and within budget.',
      avatar: '/avatars/avatar3.png',
      rating: 5,
      date: 'December 2023'
    },
    {
      id: 't4',
      name: 'David Wilson',
      position: 'CTO',
      company: 'InnovateX',
      content: 'I was impressed by Delowar\'s ability to quickly understand our complex requirements and deliver an elegant solution. His code is clean, well-documented, and maintainable. He brought innovative ideas to the table that improved the original concept. I would definitely work with him again on future projects.',
      avatar: '/avatars/avatar4.png',
      rating: 5,
      date: 'October 2023'
    }
  ];
  
  // Function to generate consistent avatar based on name (instead of random images)
  const generateAvatar = (name: string) => {
    // Extract initials
    const initials = name.split(' ').map(n => n[0]).join('');
    
    // Generate a pastel color based on the name
    const colors = ['purple', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red', 'pink'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorIndex = hash % colors.length;
    const color = colors[colorIndex];
    
    // Return a data URL for an SVG avatar with initials
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23${colorToHex(color)}' /%3E%3Ctext x='50' y='50' font-family='Arial' font-size='35' fill='white' text-anchor='middle' dominant-baseline='central'%3E${initials}%3C/text%3E%3C/svg%3E`;
  };
  
  const colorToHex = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      'purple': '7c3aed',
      'indigo': '4f46e5',
      'blue': '3b82f6',
      'green': '10b981',
      'yellow': 'f59e0b',
      'orange': 'f97316',
      'red': 'ef4444',
      'pink': 'ec4899'
    };
    
    return colorMap[colorName] || '7c3aed'; // Default to purple
  };
  
  // Update testimonials with generated avatars
  const testimonialsWithAvatars = testimonials.map(t => ({
    ...t,
    avatar: generateAvatar(t.name)
  }));
  
  // Auto-scroll through testimonials
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsWithAvatars.length);
    }, 10000); // Change every 10 seconds
    
    return () => clearInterval(interval);
  }, [inView, testimonialsWithAvatars.length]);
  
  // Navigate to specific testimonial
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };
  
  // Handle previous/next navigation
  const handlePrev = () => {
    setActiveIndex((prev) => 
      prev === 0 ? testimonialsWithAvatars.length - 1 : prev - 1
    );
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => 
      (prev + 1) % testimonialsWithAvatars.length
    );
  };
  
  // Mouse drag handling for slider
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll twice as fast as movement
    
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };
  
  const handleMouseUp = () => {
    setDragging(false);
    
    // Determine which testimonial is most visible and snap to it
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      const scrollPos = sliderRef.current.scrollLeft;
      const itemWidth = containerWidth; // Each item takes full width
      
      const index = Math.round(scrollPos / itemWidth);
      setActiveIndex(Math.max(0, Math.min(index, testimonialsWithAvatars.length - 1)));
    }
  };
  
  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  // Track current slide direction
  const [[page, direction], setPage] = useState([0, 0]);

  // Update page and direction when activeIndex changes
  useEffect(() => {
    const newDirection = page > activeIndex ? -1 : 1;
    setPage([activeIndex, newDirection]);
  }, [activeIndex, page]);

  return (
    <section id="testimonials" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-dark-900 to-dark-800">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollRevealSection>
            <div className="text-center mb-12 md:mb-16">
              <motion.div className="inline-block mb-4">
                <div className="bg-primary/10 backdrop-blur-sm p-2 rounded-full inline-block">
                  <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
              </motion.div>
              
              <motion.h2 
                className="font-space text-3xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Client <span className="text-gradient bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">Testimonials</span>
              </motion.h2>
              
              <motion.p 
                className="text-white/70 max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                What others say about working with me
              </motion.p>
            </div>
          </ScrollRevealSection>
          
          <div 
            className="relative testimonial-slider"
            ref={ref}
          >
            {/* Main testimonial display */}
            <div 
              className="relative overflow-hidden"
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: dragging ? 'grabbing' : 'grab' }}
            >
              <motion.div
                className="glass p-8 md:p-10 rounded-2xl border border-primary/20 relative"
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 }
                }}
              >
                <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/20" />
                
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden mb-3 border-2 border-primary/20">
                      <img 
                        src={testimonialsWithAvatars[activeIndex].avatar} 
                        alt={testimonialsWithAvatars[activeIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Rating stars */}
                    <div className="flex space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonialsWithAvatars[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                        />
                      ))}
                    </div>
                    
                    {/* Verification badge */}
                    <div className="flex items-center text-green-400 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      <span>Verified Client</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <blockquote className="text-white/90 text-lg md:text-xl italic mb-6">
                      "{testimonialsWithAvatars[activeIndex].content}"
                    </blockquote>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <h3 className="font-space font-bold text-white text-lg">
                          {testimonialsWithAvatars[activeIndex].name}
                        </h3>
                        <p className="text-white/70">
                          {testimonialsWithAvatars[activeIndex].position}, {testimonialsWithAvatars[activeIndex].company}
                        </p>
                      </div>
                      
                      <p className="text-white/50 text-sm mt-2 sm:mt-0">
                        {testimonialsWithAvatars[activeIndex].date}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <div className="flex items-center">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-dark-800 border border-primary/20 text-white/70 hover:text-white hover:bg-primary/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <span className="mx-4 text-white/60 text-sm">
                  {activeIndex + 1} / {testimonialsWithAvatars.length}
                </span>
                
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-dark-800 border border-primary/20 text-white/70 hover:text-white hover:bg-primary/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex space-x-2">
                {testimonialsWithAvatars.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToTestimonial(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx 
                        ? 'bg-primary w-8' 
                        : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Testimonial stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollRevealSection direction="up" distance={20}>
              <div className="glass p-6 rounded-xl border border-primary/20 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                <p className="text-white/70">Client Satisfaction Rate</p>
              </div>
            </ScrollRevealSection>
            
            <ScrollRevealSection direction="up" distance={20} delay={0.1}>
              <div className="glass p-6 rounded-xl border border-primary/20 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9/5</div>
                <p className="text-white/70">Average Project Rating</p>
              </div>
            </ScrollRevealSection>
            
            <ScrollRevealSection direction="up" distance={20} delay={0.2}>
              <div className="glass p-6 rounded-xl border border-primary/20 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                  </motion.div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <p className="text-white/70">Support & Communication</p>
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;