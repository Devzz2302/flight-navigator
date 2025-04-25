import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { Ticket } from '../types';

interface ItineraryResultProps {
  itinerary: string[];
  tickets: Ticket[];
}

const ItineraryResult: React.FC<ItineraryResultProps> = ({ itinerary, tickets }) => {
  const isValidItinerary = () => {
    if (!itinerary.length || !tickets.length) return false;
    if (itinerary.length !== tickets.length + 1) return false;
    
    for (let i = 0; i < itinerary.length - 1; i++) {
      const from = itinerary[i];
      const to = itinerary[i + 1];
      const foundTicket = tickets.some(
        ([ticketFrom, ticketTo]) => ticketFrom === from && ticketTo === to
      );
      if (!foundTicket) return false;
    }
    return true;
  };
  
  const isValid = isValidItinerary();
  
  if (!tickets.length) {
    return (
      <motion.div 
        className="bg-white rounded-lg shadow-md p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Itinerary Result</h2>
        <motion.div 
          className="flex items-center justify-center p-6 text-gray-500"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <AlertCircle className="w-5 h-5 mr-2 text-gray-400" />
          Add tickets to see the optimal itinerary
        </motion.div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Itinerary Result</h2>
      
      <AnimatePresence mode="wait">
        {itinerary.length ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex items-center mb-2"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isValid ? (
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
              )}
              <span className={isValid ? "text-green-700" : "text-orange-700"}>
                {isValid ? "Valid itinerary found!" : "Processing..."}
              </span>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap items-center mt-4 bg-gray-50 p-3 rounded-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {itinerary.map((airport, index) => (
                <React.Fragment key={index}>
                  <motion.div
                    className="flex items-center justify-center bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {airport}
                  </motion.div>
                  {index < itinerary.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <ArrowRight className="mx-2 text-gray-400" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="no-result"
            className="flex items-center justify-center p-6 text-orange-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            No valid itinerary could be found
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ItineraryResult;