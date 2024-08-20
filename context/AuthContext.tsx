"use client";
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext({ currentUser: { registeredEvents: [""] }, isAuthenticated: false, handleLogout: () => { } });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({registeredEvents: [""]});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log("Checking token");
    if (token) {
      fetch('http://localhost:3300/api/auth/check', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.isAuthenticated) {
            setIsAuthenticated(true);
            setCurrentUser(data.user);
            // console.log(currentUser);
          } else {
            setIsAuthenticated(false);
          }
        });
    } else {
      setIsAuthenticated(false);
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3300/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        // Potential issue
        setCurrentUser({registeredEvents: [""]});
        window.location.href = '/';
      } else {
        console.error('Logout failed.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
