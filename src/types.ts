export interface Task {
  _id?: string;
  id?: string; // string representation of ObjectId
  title: string;
  shortDescription: string;
  fullDescription: string;
  budget: number;
  category: string;
  location: string; // e.g. "Remote", "Dhaka", "San Francisco"
  rating: number; // mock rating of project or client
  date: string; // ISO date string
  priority: 'low' | 'medium' | 'high';
  image: string; // Unsplash image URL
  clientName: string;
  clientEmail?: string;
}

export interface User {
  name: string;
  email: string;
  role: 'freelancer' | 'client';
  token?: string;
}
