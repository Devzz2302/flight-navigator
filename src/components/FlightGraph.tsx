import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Ticket, AirportNode, FlightConnection } from '../types';

interface FlightGraphProps {
  tickets: Ticket[];
  itinerary: string[];
}

const FlightGraph: React.FC<FlightGraphProps> = ({ tickets, itinerary }) => {
  const [nodes, setNodes] = useState<AirportNode[]>([]);
  const [connections, setConnections] = useState<FlightConnection[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!tickets.length) return;
    
    const airports = Array.from(
      new Set(tickets.flatMap(([from, to]) => [from, to]))
    );
    
    const containerWidth = containerRef.current?.clientWidth || 600;
    const containerHeight = 400;
    const radius = Math.min(containerWidth, containerHeight) * 0.4;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    
    const newNodes = airports.map((id, index) => {
      const angle = (index / airports.length) * 2 * Math.PI;
      return {
        id,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });
    
    setNodes(newNodes);
    
    const newConnections = tickets.map(([from, to]) => ({
      source: from,
      target: to
    }));
    
    setConnections(newConnections);
  }, [tickets]);
  
  const getNodeColor = (airport: string) => {
    if (airport === 'JFK') return 'bg-red-500';
    if (itinerary.length && airport === itinerary[itinerary.length - 1]) return 'bg-green-500';
    return 'bg-blue-500';
  };
  
  const isConnectionHighlighted = (source: string, target: string) => {
    if (!itinerary.length) return false;
    
    for (let i = 0; i < itinerary.length - 1; i++) {
      if (itinerary[i] === source && itinerary[i + 1] === target) {
        return true;
      }
    }
    
    return false;
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-[400px] bg-slate-50 rounded-lg shadow-md p-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-xl font-bold mb-2 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Flight Graph
      </motion.h2>
      
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <AnimatePresence>
        {!nodes.length && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Add tickets to visualize the flight graph
          </motion.div>
        )}
      </AnimatePresence>
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {connections.map((connection, index) => {
            const source = nodes.find(node => node.id === connection.source);
            const target = nodes.find(node => node.id === connection.target);
            
            if (!source || !target) return null;
            
            const isHighlighted = isConnectionHighlighted(connection.source, connection.target);
            
            return (
              <motion.g
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isHighlighted ? "#F97316" : "#94A3B8"}
                  strokeWidth={isHighlighted ? 3 : 1.5}
                  strokeDasharray={isHighlighted ? "none" : "4 2"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`transition-all duration-500 ${isHighlighted ? 'opacity-100' : 'opacity-50'}`}
                />
                
                <motion.circle
                  cx={(source.x + target.x) / 2}
                  cy={(source.y + target.y) / 2}
                  r={4}
                  fill={isHighlighted ? "#F97316" : "#94A3B8"}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                  className={`transition-colors duration-500 ${isHighlighted ? 'opacity-100' : 'opacity-50'}`}
                />
              </motion.g>
            );
          })}
        </AnimatePresence>
      </svg>
      
      <AnimatePresence>
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className={`absolute w-12 h-12 flex items-center justify-center rounded-full ${getNodeColor(node.id)} text-white font-bold shadow-lg cursor-pointer z-10`}
            style={{
              left: `${node.x - 24}px`,
              top: `${node.y - 24}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={`Airport: ${node.id}`}
          >
            {node.id}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default FlightGraph;