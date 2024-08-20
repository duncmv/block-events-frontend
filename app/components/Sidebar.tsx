"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface SidebarProps {
  currentTab: string;
}

const Sidebar = ({ currentTab }: SidebarProps) => {
  const { currentUser, handleLogout }: any = useContext(AuthContext);

  const getTabName = (tab: any) => {
    switch (tab) {
      case "myEvents":
        return "My Events";
      case "registeredEvents":
        return "Registered Events";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="h-full flex">
      <input type="checkbox" id="menu-toggle" className="hidden" />
      <div className="flex flex-col h-full w-64 bg-white text-neutral-800 transform -translate-x-full transition-transform duration-300 ease-in-out md:translate-x-0 z-50 p-4 rounded-lg">
        <div className="mb-4">
          {/*<h2 className="text-xl font-bold text-darkred mb-4">
            {getTabName(currentTab)}
          </h2>*/}
          <ul className="space-y-2">
            <li>
              <Link
                href={{ pathname: "/Dashboard", query: { tab: "myEvents" } }}
                className={`w-full p-2 text-left block rounded-lg ${
                  currentTab === "myEvents"
                    ? "bg-red-900 text-white"
                    : "bg-gray-200 text-red-900"
                }`}
              >
                My Events
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/Dashboard",
                  query: { tab: "registeredEvents" },
                }}
                className={`w-full p-2 text-left block rounded-lg ${
                  currentTab === "registeredEvents"
                    ? "bg-red-900 text-white"
                    : "bg-gray-200 text-red-900"
                }`}
              >
                Registered Events
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-auto">
          <div className="flex flex-col items-center justify-between mt-8 mb-2">
            <div className="relative mb-0">
              <div className="avatar ring-primary ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
                <img
                  className="h-full w-full object-cover rounded-full"
                  src={
                    currentUser?.avatarUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="Avatar"
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mb-4">
              <p className="text-lg font-bold">
                {currentUser?.username || "John Doe"}
              </p>
              <p className="text-xs">
                {currentUser?.email || "john.doe@example.com"}
              </p>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <button className="w-full p-2 text-center block rounded-lg bg-gray-200 text-red-900">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full p-2 flex items-center justify-center space-x-2 rounded-lg bg-gray-200 text-red-900"
              >
                <span>Sign Out </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <label
        htmlFor="menu-toggle"
        className="cursor-pointer  block md:hidden absolute top-4 left-4 z-50"
      >
        <svg
          className="w-6 h-6 text-neutral-800"
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
          ></path>
        </svg>
      </label>
    </div>
  );
};

export default Sidebar;
