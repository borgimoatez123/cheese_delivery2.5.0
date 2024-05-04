import axios from 'axios';
import { API_URL} from "../constants/theme";


export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          return data.token; // Assuming the token is returned upon a successful login
        } else {
          throw new Error(data.message || 'Unable to login');
        }
      } catch (error) {
        console.error('Login Error:', error);
        throw error;
      }
    };