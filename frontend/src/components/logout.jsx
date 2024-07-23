import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { useUser } from '../UserContext';
import { Link } from "react-router-dom";
import { useEffect } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('Users');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      setUser(null);
      localStorage.removeItem('sessionToken'); 
      console.log('Logout successful');
   
    } else {
      console.error('Logout failed');
     
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

  const value = { user, setUser, handleLogout };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);