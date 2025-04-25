import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Resume from "@/pages/Resume";
import { ThemeProvider } from "next-themes";
import DynamicIslandNav from "@/components/DynamicIslandNav";
import MobileNavigation from "@/components/MobileNavigation";
import Universe3DBackground from "@/components/Universe3DBackground";
import CursorTracker from "@/components/CursorTracker";
import AIAssistant from "@/components/AIAssistant";
import { Suspense, lazy, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Loading component with animation
const LoadingScreen = () => (
  <motion.div 
    className="fixed inset-0 bg-dark-900 flex flex-col items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }}
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary animate-glow flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-dark-900 flex items-center justify-center">
          <motion.span 
            className="font-space font-bold text-2xl text-white"
            animate={{ 
              opacity: [0.6, 1, 0.6],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            DH
          </motion.span>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-md blur-md bg-gradient-to-r from-primary/40 to-secondary/40"></div>
        <div className="relative text-white font-medium bg-dark-900/80 px-4 py-1 rounded-md">
          Loading...
        </div>
      </div>
    </motion.div>
  </motion.div>
);

function Router() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/resume" component={Resume} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setAppLoaded(true);
    }, 1500);
    
    // Make sure body has proper styles
    document.body.style.background = "#000000";
    document.body.style.overflowX = "hidden";

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <AnimatePresence>
            {!appLoaded && <LoadingScreen />}
          </AnimatePresence>
          
          <motion.div 
            className="flex flex-col min-h-screen bg-dark-900 text-white overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Universe3DBackground />
            {isMobile ? <MobileNavigation /> : <DynamicIslandNav />}
            <CursorTracker />
            <Router />
            <AIAssistant />
            <Toaster />
          </motion.div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
