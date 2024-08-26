"use client";
import React, { useContext, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated }: any = useContext(AuthContext);
  const router = useRouter();
  const currentPath = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const linkClasses = (path: string) =>
    currentPath === path
      ? "px-4 py-2 text-red-900 font-medium border-b-2 border-red-900"
      : "px-4 py-2 hover:text-red-900 font-medium";

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-rounded shadow-sm relative">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={150} height={200} />
      </Link>
      <nav className="hidden md:flex justify-end space-x-4">
        {isAuthenticated && localStorage.getItem("token") && (
          <Link href="/Dashboard" className={linkClasses("/Dashboard")}>
            Dashboard
          </Link>
        )}
        <Link href="/Events" className={linkClasses("/Events")}>
          Events
        </Link>
        <Link href="/Services" className={linkClasses("/Services")}>
          Services
        </Link>
        <Link href="/About" className={linkClasses("/About")}>
          About Us
        </Link>
        {!isAuthenticated && (
          <Link href="/Login" className={linkClasses("/Login")}>
            Sign In
          </Link>
        )}
      </nav>
      
      <div ref={menuRef}>
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
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col absolute top-20 right-4 bg-white w-56 max-h-64 border rounded-lg space-y-2 p-4 z-50 shadow-lg">
          {isAuthenticated && localStorage.getItem("token") && (
            <>
              <Link href="/Dashboard" className={linkClasses("/Dashboard")}>
                Dashboard
              </Link>
            </>
          )}
          <Link href="/Events" className={linkClasses("/Events")}>
            Events
          </Link>
          <Link href="/Services" className={linkClasses("/Services")}>
            Services
          </Link>
          <Link href="/About" className={linkClasses("/About")}>
            About Us
          </Link>
          {!isAuthenticated && (
            <Link href="/Login" className={linkClasses("/Login")}>
              Sign In
            </Link>
          )}
        </nav>
      )}
      </div>
    </header>
  );
};

export default Header;
