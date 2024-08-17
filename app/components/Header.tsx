"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // or use cookies.get('jwt')

    if (token) {
      // Optionally, verify the token by making a request to the backend
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
        router.push('/');
      } else {
        console.error('Logout failed.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={150} height={200} />
      </Link>
      <nav className="flex justify-end">
        {isAuthenticated && localStorage.getItem('token') && (
          <>
            <Link href="/Dashboard" className="px-4 py-2 hover:text-red-900 font-medium">
              Dashboard
            </Link>
          </>
        )}
        <Link href="/Events" className="px-4 py-2 hover:text-red-900 font-medium">
          Events
        </Link>
        <Link href="/Services" className="px-4 py-2 hover:text-red-900 font-medium">
          Services
        </Link>
        <Link href="/AboutUs" className="px-4 py-2 hover:text-red-900 font-medium">
          About Us
        </Link>
        {!isAuthenticated && (
        <Link href="/Login" className="px-4 py-2 hover:text-red-900 font-medium">
          Sign In
        </Link>
        )}
        {isAuthenticated && (
          <button onClick={handleLogout} className="px-4 py-2 hover:text-red-900 font-medium">
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
