"use client";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EllipsisMenu = ({ currentTab }: any) => {
  const { currentUser, handleLogout }: any = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mediaUrl = "http://localhost:3300/media/";
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative z-50">
      <div className="flex items-center justify-center">
        <button onClick={toggleMenu} className="text-3xl">
          &#x2026; {/* Ellipsis */}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          {/* Avatar Section */}
          <div className="flex flex-col items-center p-4">
            <div className="avatar w-16 rounded-full ring ring-offset-2 ring-primary ring-offset-base-100">
              <img
                className="h-full w-full object-cover rounded-full"
                src={
                  currentUser?.profile?.avatar
                  ? mediaUrl + currentUser?.profile?.avatar
                  : "/media/profile.webp"
                }
                alt="Avatar"
              />
            </div>
          </div>

          {/* Menu Options */}
          <ul className="space-y-2 p-2">
            <li>
              <p className="text-center text-sm ">{currentUser?.userName || "John Doe"}</p>
            </li>
            <li>
              <Link
                href={{ pathname: "/Dashboard", query: { tab: "myEvents" } }}
                className={`block px-4 py-2 rounded text-sm ${
                  currentTab === "myEvents"
                    ? "bg-red-900 text-white"
                    : "text-gray-900"
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
                className={`block px-4 rounded py-2 text-sm ${
                  currentTab === "registeredEvents"
                    ? "bg-red-900 text-white"
                    : "text-gray-900"
                }`}
              >
                Registered Events
              </Link>
            </li>
            <li>
            <button onClick={() => {
                  router.push(`/Users/Update/${currentUser?._id}`);
                }} className="w-full p-2 text-center block rounded-lg bg-gray-200 text-red-900">
                Edit Profile
              </button>
            </li>
            <li>
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
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EllipsisMenu;
