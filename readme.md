# Lexflight Navigator 
## Overview 
* It is an is an intelligent itinerary planner designed to trace a traveler’s journey using a set of airline tickets. The traveler always begins their trip from “JFK”, and every ticket must be used exactly once. If multiple valid itineraries exist, the one with the smallest lexicographical order is returned.
 ### Approach
 
	•Flight tickets are modeled as a directed graph (nodes = airports, edges = tickets).

	•We apply Hierholzer’s Algorithm to find an Eulerian path starting at “JFK”.

	•Tickets are sorted lexicographically to ensure the smallest valid itinerary is chosen.



## How to use 
1. Input Flight Tickets 
2. You will see a form or input section where you can enter flight tickets in the format:
[["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ...]
3. Submit the input to begin processing.
4. View Constructed Itinerary:

	•	The website will visualize the valid path starting from JFK using a directed graph.

	•	The itinerary will be displayed as an ordered list of airport codes.
5. Simulation & Animation:

	•	The transitions and construction of the path are animated using Framer Motion.

	•	Graph rendering will dynamically reflect how the algorithm progresses.
6.	Reset & Try Again:

	•	Easily reset the input and try different ticket combinations to see how the itinerary changes.

