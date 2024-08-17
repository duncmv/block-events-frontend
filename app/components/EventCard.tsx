import React from "react";

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
  media: {
    pictures: string[];
    videos: string[];
  };
  category: string;
}
interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const pics = (event as any).media?.pictures.map((pic: string, key: number) => (
    <img key={key} className="w-full" src="https://picsum.photos/seed/picsum/500/300" alt="Event image" />
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
          {new Date(event.startDateTime).toLocaleString()} {/* Converts the date to a readable format */}
        </p>
        <div className="flex justify-end">
          <span className="badge badge-outline text-sm">{event.category}</span>
        </div>
      </div>
    </div>

  );
};

export default EventCard;
