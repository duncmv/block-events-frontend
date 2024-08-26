"use client";
import React, { createContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const AuthContext = createContext({ 
  currentUser: { registeredEvents: [""] }, 
  isAuthenticated: false, 
  handleLogout: () => {} 
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({ registeredEvents: [""] });
  const router = useRouter();
  const pathname = usePathname(); // Hook to track the current path

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
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
          } else {
            setIsAuthenticated(false);
            setCurrentUser({ registeredEvents: [""] });
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          setCurrentUser({ registeredEvents: [""] });
        });
    } else {
      setIsAuthenticated(false);
      setCurrentUser({ registeredEvents: [""] });
    }
  };

  useEffect(() => {
    // Check authentication when the component mounts and whenever the pathname changes
    checkAuthentication();
  }, [pathname]); // Re-run on pathname change

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3300/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setCurrentUser({ registeredEvents: [""] });
        router.push('/'); // Use router.push instead of window.location.href
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
