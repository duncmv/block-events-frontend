"use client";
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = ({ currentTab }) => {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  const getTabName = (tab) => {
    switch (tab) {
      case 'myEvents':
        return 'My Events';
      case 'registeredEvents':
        return 'Registered Events';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="h-full flex">
      <input type="checkbox" id="menu-toggle" className="hidden" />
      <div className="flex flex-col h-full w-64 bg-white text-neutral-800 transform -translate-x-full transition-transform duration-300 ease-in-out md:translate-x-0 z-50 p-4 border border-gray-300 rounded-lg">
        
        <div className="mb-4">
          <h2 className="text-xl font-bold text-darkred mb-4">{getTabName(currentTab)}</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href={{ pathname: '/Dashboard', query: { tab: 'myEvents' } }}
                className={`w-full p-2 text-left block rounded-lg ${currentTab === 'myEvents' ? 'bg-red-900 text-white' : 'bg-gray-200 text-red-900'}`}
              >
                My Events
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: '/Dashboard', query: { tab: 'registeredEvents' } }}
                className={`w-full p-2 text-left block rounded-lg ${currentTab === 'registeredEvents' ? 'bg-red-900 text-white' : 'bg-gray-200 text-red-900'}`}
              >
                Registered Events
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center mt-auto">
          <div className="relative mb-4">
            <div className="avatar ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img className="h-full w-full object-cover rounded-full" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-4">
            <p className="text-lg font-bold">John Doe</p>
            <p className="text-xs">john.doe@example.com</p>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <button className="w-full p-2 text-center block rounded-lg bg-red-900 text-white">Edit Profile</button>
            <button onClick={handleLogout} className="w-full p-2 text-center block rounded-lg bg-gray-200 text-red-900">Sign Out</button>
          </div>
        </div>
      </div>
      <label htmlFor="menu-toggle" className="cursor-pointer p-4 block md:hidden absolute top-4 left-4 z-50">
        <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </label>
    </div>
  );
};

export default Sidebar;
