"use client";
import React, { useEffect } from "react";
import EventModal from "./EventModal";
import { AuthContext } from "../../context/AuthContext";
import { useState, useContext } from "react";

interface Event {
  _id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime?: string;
  location: string;
  media: string[];
  category: string;
}
interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const [register, setRegister] = useState(false);
  const { currentUser, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // if (!currentUser) { return; }
    if (isAuthenticated && currentUser.registeredEvents.includes(event._id)) {
      setRegister(true);
    }
  }, []);

  const medialUrl = 'http://localhost:3300/media/';
  const pics = <img src={medialUrl + event.media} style={{ width: '500px', height: '200px' }} alt="" />
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <a
        onClick={() => document?.getElementById(event._id).showModal()}
        className="block"
      >
        <figure className="w-full h-48 md:h-60 overflow-hidden">{pics}</figure>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 flex items-center justify-between text-black">
            {event.title}
          </div>
          <p className="text-gray-700 text-base mb-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mr-2 text-red-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            {event.location}
          </p>
          <p className="text-gray-700 text-base mb-1 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mr-2  text-red-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            {new Date(event.startDateTime).toLocaleString(undefined, {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div className="flex justify-end mt-4">
            <span className="px-3 py-1 text-sm font-semibold text-black bg-gray-200 rounded-full">
              {event.category}
            </span>
          </div>
        </div>
        <EventModal
          event={event}
          register={register}
          setRegister={setRegister}
        />
      </a>
    </div>
  );
};

export default EventCard;
