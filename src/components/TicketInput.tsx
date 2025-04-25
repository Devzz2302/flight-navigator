import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, Plane } from 'lucide-react';
import { Ticket } from '../types';

interface TicketInputProps {
  tickets: Ticket[];
  onUpdateTickets: (tickets: Ticket[]) => void;
  onLoadExample: (exampleId: number) => void;
}

const TicketInput: React.FC<TicketInputProps> = ({ 
  tickets, 
  onUpdateTickets,
  onLoadExample 
}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleAddTicket = () => {
    if (from && to) {
      const newTickets = [...tickets, [from, to]];
      onUpdateTickets(newTickets);
      setFrom('');
      setTo('');
    }
  };

  const handleRemoveTicket = (index: number) => {
    const newTickets = tickets.filter((_, i) => i !== index);
    onUpdateTickets(newTickets);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Flight Tickets</h2>
        <Plane className="w-6 h-6 text-blue-500 transform -rotate-45" />
      </div>
      
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">From</label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value.toUpperCase())}
            placeholder="Airport code (e.g. JFK)"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            maxLength={3}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">To</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value.toUpperCase())}
            placeholder="Airport code (e.g. SFO)"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            maxLength={3}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-6">
        <motion.button
          onClick={handleAddTicket}
          disabled={!from || !to}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Ticket
        </motion.button>
        
        <motion.button
          onClick={() => onLoadExample(1)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Example 1
        </motion.button>
        
        <motion.button
          onClick={() => onLoadExample(2)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Example 2
        </motion.button>
      </div>
      
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {tickets.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center space-y-2">
                      <Plane className="w-8 h-8 text-gray-400 transform -rotate-45" />
                      <p>No tickets added yet. Start by adding tickets or loading an example.</p>
                    </div>
                  </td>
                </motion.tr>
              ) : (
                tickets.map((ticket, index) => (
                  <motion.tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ticket[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket[1]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <motion.button
                        onClick={() => handleRemoveTicket(index)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketInput;