// UserContext.jsx
import React, {useEffect, createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      fetch(`http://localhost:3000/user/details/${sessionToken}`, {
        credentials: 'include', // Ensure credentials (like cookies) are sent
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          return response.json();
        })
        .then(data => setUser(data))
        .catch(error => console.error('Error fetching user details:', error));
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
