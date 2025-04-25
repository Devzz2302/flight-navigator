import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowScroll } from 'react-use';
import Header from './components/Header';
import TicketInput from './components/TicketInput';
import FlightGraph from './components/FlightGraph';
import ItineraryResult from './components/ItineraryResult';
import AlgorithmExplanation from './components/AlgorithmExplanation';
import { findItinerary } from './utils/findItinerary';
import { Ticket } from './types';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [itinerary, setItinerary] = useState<string[]>([]);
  const { y: scrollY } = useWindowScroll();

  const examples = {
    1: [["MUC","LHR"], ["JFK","MUC"], ["SFO","SJC"], ["LHR","SFO"]],
    2: [["JFK","SFO"], ["JFK","ATL"], ["SFO","ATL"], ["ATL","JFK"], ["ATL","SFO"]]
  };

  useEffect(() => {
    if (tickets.length > 0) {
      const result = findItinerary(tickets);
      setItinerary(result);
    } else {
      setItinerary([]);
    }
  }, [tickets]);

  const handleUpdateTickets = (newTickets: Ticket[]) => {
    setTickets(newTickets);
  };

  const handleLoadExample = (exampleId: number) => {
    if (exampleId in examples) {
      setTickets(examples[exampleId as keyof typeof examples]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-primary-950">
      <Header scrollY={scrollY} />
      
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-8">
            <motion.div 
              className="gradient-border hover-card card-hover-effect"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <TicketInput 
                tickets={tickets} 
                onUpdateTickets={handleUpdateTickets}
                onLoadExample={handleLoadExample}
              />
            </motion.div>
            <motion.div 
              className="glass-morphism hover-card card-hover-effect"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <AlgorithmExplanation />
            </motion.div>
          </div>
          
          <div className="space-y-8">
            <motion.div 
              className="glass-morphism shadow-xl hover-card card-hover-effect"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FlightGraph tickets={tickets} itinerary={itinerary} />
            </motion.div>
            <motion.div 
              className="gradient-border hover-card card-hover-effect"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ItineraryResult itinerary={itinerary} tickets={tickets} />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.footer 
          className="mt-16 text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.p 
            className="glass-morphism inline-block px-8 py-4 rounded-full animate-float"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            LexFlight Navigator © 2025
          </motion.p>
        </motion.footer>
      </main>
    </div>
  );
}

export default App;