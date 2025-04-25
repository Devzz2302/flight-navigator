import { Graph, Ticket } from '../types';

/**
 * Finds the lexicographically smallest itinerary starting from JFK
 * @param tickets Array of [from, to] ticket pairs
 * @returns Array of airport codes representing the complete itinerary
 */
export function findItinerary(tickets: Ticket[]): string[] {
  // Build the graph
  const graph: Graph = {};
  
  // Initialize the graph with empty adjacency lists
  tickets.forEach(([from, to]) => {
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];
  });
  
  // Add destinations and sort them lexicographically
  tickets.forEach(([from, to]) => {
    graph[from].push(to);
  });
  
  // Sort destinations for each airport to ensure lexicographical ordering
  Object.keys(graph).forEach(airport => {
    graph[airport].sort();
  });
  
  const itinerary: string[] = [];
  
  function dfs(airport: string): boolean {
    // If we've used all tickets, we're done
    if (Object.values(graph).every(destinations => destinations.length === 0)) {
      itinerary.push(airport);
      return true;
    }
    
    // No more outgoing flights from current airport
    if (!graph[airport] || graph[airport].length === 0) {
      return false;
    }
    
    // Try each destination in lexicographical order
    const destinations = [...graph[airport]];
    for (let i = 0; i < destinations.length; i++) {
      const destination = destinations[i];
      
      // Remove this flight from the graph (use the ticket)
      graph[airport].splice(graph[airport].indexOf(destination), 1);
      
      // Add current airport to itinerary
      itinerary.push(airport);
      
      // Recursively explore from the destination
      if (dfs(destination)) {
        return true;
      }
      
      // Backtrack if this path doesn't work
      itinerary.pop();
      graph[airport].splice(i, 0, destination);
    }
    
    return false;
  }
  
  // Start DFS from JFK
  dfs("JFK");
  
  return itinerary;
}

// Helper function for step-by-step execution
export function findItineraryStepByStep(tickets: Ticket[]): { 
  graph: Graph,
  steps: Array<{
    currentAirport: string,
    visited: string[],
    remaining: Graph
  }>
} {
  // Build the graph
  const graph: Graph = {};
  
  // Initialize the graph with empty adjacency lists
  tickets.forEach(([from, to]) => {
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];
  });
  
  // Add destinations and sort them lexicographically
  tickets.forEach(([from, to]) => {
    graph[from].push(to);
  });
  
  // Sort destinations for each airport to ensure lexicographical ordering
  Object.keys(graph).forEach(airport => {
    graph[airport].sort();
  });
  
  const steps: Array<{
    currentAirport: string,
    visited: string[],
    remaining: Graph
  }> = [];
  
  const itinerary: string[] = [];
  
  function dfs(airport: string): boolean {
    // Record the current state for visualization
    steps.push({
      currentAirport: airport,
      visited: [...itinerary],
      remaining: JSON.parse(JSON.stringify(graph))
    });
    
    // If we've used all tickets, we're done
    if (Object.values(graph).every(destinations => destinations.length === 0)) {
      itinerary.push(airport);
      return true;
    }
    
    // No more outgoing flights from current airport
    if (!graph[airport] || graph[airport].length === 0) {
      return false;
    }
    
    // Try each destination in lexicographical order
    const destinations = [...graph[airport]];
    for (let i = 0; i < destinations.length; i++) {
      const destination = destinations[i];
      
      // Remove this flight from the graph (use the ticket)
      graph[airport].splice(graph[airport].indexOf(destination), 1);
      
      // Add current airport to itinerary
      itinerary.push(airport);
      
      // Recursively explore from the destination
      if (dfs(destination)) {
        return true;
      }
      
      // Backtrack if this path doesn't work
      itinerary.pop();
      graph[airport].splice(i, 0, destination);
      
      // Record backtracking for visualization
      steps.push({
        currentAirport: airport,
        visited: [...itinerary],
        remaining: JSON.parse(JSON.stringify(graph))
      });
    }
    
    return false;
  }
  
  // Start DFS from JFK
  dfs("JFK");
  
  return { graph, steps };
}