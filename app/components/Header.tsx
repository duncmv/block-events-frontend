"use client";
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../context/AuthContext'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  //useEffect(() => {
  //  const token = localStorage.getItem('token'); // or use cookies.get('jwt')
//
  //  if (token) {
  //    // Optionally, verify the token by making a request to the backend
  //    fetch('http://localhost:3300/api/auth/check', {
  //      method: 'GET',
  //      credentials: 'include',
  //      headers: {
  //        Authorization: `Bearer ${token}`,
  //      },
  //    })
  //      .then(response => response.json())
  //      .then(data => {
  //        if (data.isAuthenticated) {
  //          setIsAuthenticated(true);
  //        } else {
  //          setIsAuthenticated(false);
  //        }
  //      });
  //  } else {
  //    setIsAuthenticated(false);
  //  }
  //}, [router]);

  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //const handleLogout = async () => {
  //  try {
  //    const response = await fetch('http://localhost:3300/api/auth/logout', {
  //      method: 'POST',
  //      credentials: 'include',
  //    });
//
  //    if (response.ok) {
  //      localStorage.removeItem('token');
  //      setIsAuthenticated(false);
  //      router.push('/');
  //    } else {
  //      console.error('Logout failed.');
  //    }
  //  } catch (error) {
  //    console.error('Error logging out:', error);
  //  }
  //};


  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b relative">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={150} height={200} />
      </Link>
      <nav className="hidden md:flex justify-end space-x-4">
        {isAuthenticated && localStorage.getItem('token') && (
          <Link href="/Dashboard" className="px-4 py-2 hover:text-red-900 font-medium">
            Dashboard
          </Link>
        )}
        <Link href="/Events" className="px-4 py-2 hover:text-red-900 font-medium">
          Events
        </Link>
        <Link href="/Services" className="px-4 py-2 hover:text-red-900 font-medium">
          Services
        </Link>
        <Link href="/About" className="px-4 py-2 hover:text-red-900 font-medium">
          About Us
        </Link>
        {!isAuthenticated && (
        <Link href="/Login" className="px-4 py-2 hover:text-red-900 font-medium">
          Sign In
        </Link>
        )}
      </nav>
      {/* Hamburger Menu Icon for small screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden flex flex-col absolute top-20 right-4 bg-white w-56 max-h-64 border rounded-lg space-y-2 p-4 z-50 shadow-lg">
          {isAuthenticated && localStorage.getItem('token') && (
          <>
            <Link href="/Dashboard" className="px-4 py-2 hover:text-red-900 font-medium">
              Dashboard
            </Link>
          </>
          )}
          <Link
            href="/Events"
            className="px-4 py-2 hover:text-red-900 font-medium"
          >
            Events
          </Link>
          <Link
            href="/Services"
            className="px-4 py-2 hover:text-red-900 font-medium"
          >
            Services
          </Link>
          <Link
            href="/About"
            className="px-4 py-2 hover:text-red-900 font-medium"
          >
            About Us
          </Link>
          {!isAuthenticated && (
            <Link href="/Login" className="px-4 py-2 hover:text-red-900 font-medium">
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
