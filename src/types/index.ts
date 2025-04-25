export type Ticket = [string, string];

export type Graph = {
  [key: string]: string[];
};

export interface AirportNode {
  id: string;
  x: number;
  y: number;
}

export interface FlightConnection {
  source: string;
  target: string;
}