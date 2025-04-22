import axios from 'axios';

const API_BASE = '/mock-api';

export const fetchMessages = async () => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const response = await axios.get(`${API_BASE}/messages.json`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch messages');
  }
};

export const sendMessage = async (message) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, this would POST to an API
    return message; // Return the message for optimistic update
  } catch (error) {
    throw new Error('Failed to send message');
  }
};

export const login = async (credentials) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock authentication - in a real app, verify credentials
    return { 
      user: { id: 1, name: "Alice" }, 
      token: "mock-token" 
    };
  } catch (error) {
    throw new Error('Login failed');
  }
};