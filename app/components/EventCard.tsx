import React from "react";

interface Event {
  id: number;
  title: string;
  startDateTime: Date;
  endDateTime?: Date;
  location: {
    address: string;
    city: string;
    state: string;
    zip_code?: string;
    googleMapsLink?: string;
  };
  category: string;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <figure>
        <img src="https://random.imagecdn.app/500/150" alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {event.title}
          <div className="badge badge-secondary">HOT</div>
        </h2>
        <p>{event.startDateTime.toLocaleDateString()}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{event.category}</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
