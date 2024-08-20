"use client";
import React, { useEffect } from "react";
import EventModal from "./EventModal"
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
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <figure>
        {pics}
      </figure>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 flex items-center justify-between">
          {event.title}
        </div>
        <p className="text-gray-700 text-base mb-1">{event.location}</p>
        <p className="text-gray-700 text-base mb-1">{new Date(event.startDateTime).toLocaleString(undefined, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}</p>
        
        <button
        className="mt-3 btn btn-primary text-white"
        onClick={() => {
          const modal = document.getElementById(event._id) as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}
        >
        Details
        </button>
        <div className="flex justify-end">
          <span className="badge badge-outline text-sm">{event.category}</span>
        </div>
      </div>
      <EventModal event={event} register={register} setRegister={setRegister}/>
    </div>

  );
};

export default EventCard;
