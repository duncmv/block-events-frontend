"use client";
import React from "react";
import EventModal from "./EventModal"

interface Event {
  _id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime?: string;
  location: {
    address: string;
    city: string;
    state: string;
    zip_code?: string;
    googleMapsLink?: string;
  };
  media: string[];
  category: string;
}
interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const media_url = 'http://localhost:3300/media/';
  const pics = (event as any).media?.map((pic: string, key: number) => (
    <img key={key} className="w-full" src={media_url + pic} alt="Event image" />
  ));
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <figure>
        {pics}
      </figure>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 flex items-center justify-between">
          {event.title}
          <span className="badge badge-secondary text-sm">HOT</span>
        </div>
        <p className="text-gray-700 text-base mb-4">
          {new Date(event.startDateTime).toLocaleString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <button
        className="btn btn-primary text-white"
        onClick={() => document.getElementById('my_modal_2').showModal()}
        >
        Details
        </button>
        <div className="flex justify-end">
          <span className="badge badge-outline text-sm">{event.category}</span>
        </div>
      </div>
      
      <EventModal event={event} />
    </div>

  );
};

export default EventCard;
