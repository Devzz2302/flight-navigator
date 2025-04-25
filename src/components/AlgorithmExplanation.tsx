import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const AlgorithmExplanation: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(prev => !prev)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: isExpanded ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <HelpCircle className="w-5 h-5 mr-2 text-blue-500" />
          </motion.div>
          <h2 className="text-xl font-bold text-gray-800">How It Works</h2>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="mt-4 text-gray-700 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              The LexFlight Navigator solves a graph traversal problem known as the 
              "Eulerian path problem with a lexical constraint."
            </motion.p>
            
            <motion.h3 
              className="font-semibold text-lg"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Algorithm Steps:
            </motion.h3>
            
            <motion.ol 
              className="list-decimal list-inside space-y-2 ml-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[
                {
                  title: "Build the graph",
                  description: "Create an adjacency list representation where each airport is a node, and tickets are directed edges."
                },
                {
                  title: "Sort destinations",
                  description: "For each airport, sort its outgoing flights lexicographically to ensure we always pick the smallest one first."
                },
                {
                  title: "Depth-First Search (DFS)",
                  description: "Starting from JFK, recursively explore all possible paths using each ticket exactly once."
                },
                {
                  title: "Backtracking",
                  description: "If we reach a dead end, backtrack and try a different path."
                },
                {
                  title: "Return the path",
                  description: "Once all tickets are used, we have found our valid itinerary with the smallest lexical order."
                }
              ].map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <span className="font-medium">{step.title}</span>: {step.description}
                </motion.li>
              ))}
            </motion.ol>
            
            <motion.div 
              className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <h4 className="font-semibold">Problem Constraints:</h4>
              <motion.ul 
                className="list-disc list-inside ml-2 mt-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[
                  "Must always start at JFK airport",
                  "Must use every ticket exactly once",
                  "If multiple valid itineraries exist, return the lexicographically smallest one"
                ].map((constraint, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {constraint}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              The time complexity is O(E log E) where E is the number of edges (tickets),
              due to the sorting of destinations. The space complexity is O(E) for the graph 
              representation.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AlgorithmExplanation;