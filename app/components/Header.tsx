"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b relative">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={150} height={200} />
      </Link>
      <nav className="hidden md:flex justify-end space-x-4">
        <Link
          href="/Events"
          className="px-4 py-2 hover:text-red-900 font-medium"
        >
          Events
        </Link>
        <Link
          href="/Dashboard"
          className="px-4 py-2 hover:text-red-900 font-medium"
        >
          Dashboard
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
        <Link
          href="/Login"
          className="px-4 py-2 hover:text-red-900 font-medium"
        >
          Sign In
        </Link>
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
          <Link
            href="/Events"
            className="px-4 py-2 hover:text-red-900 font-medium"
          >
            Events
          </Link>
          <Link
            href="/Dashboard"
            className="px-4 py-2 hover:text-red-900 font-medium"
          >
            Dashboard
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
          <Link
            href="/Login"
            className="px-4 py-2 hover:text-red-900 font-medium"
          >
            Sign In
          </Link>
        </nav>
      )}
    </header>
  );
}
