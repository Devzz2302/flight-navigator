import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { Plane } from 'lucide-react';

interface HeaderProps {
  scrollY: number;
}

const Header: React.FC<HeaderProps> = ({ scrollY }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  return (
    <motion.header 
      className="bg-gradient text-white py-8 shadow-lg relative overflow-hidden"
      style={{ opacity, scale }}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="p-4 bg-primary-600 rounded-2xl shadow-lg animate-pulse-glow"
              whileHover={{ rotate: -45, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Plane className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-4xl font-bold tracking-tight text-gradient"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                LexFlight Navigator
              </motion.h1>
              <motion.p 
                className="text-lg text-primary-200 mt-2 font-medium"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Intelligent itinerary planner
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="glass-morphism px-6 py-3 rounded-full flex items-center space-x-3">
              <div className="w-2.5 h-2.5 bg-primary-400 rounded-full animate-pulse"></div>
              <span className="text-primary-100 font-medium">Live Updates</span>
            </span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;