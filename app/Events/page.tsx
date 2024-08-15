"use client";
import SearchAndFilter from "../components/SearchAndFilter";
import { useState } from "react";
import events from "./events";
import EventCard from "../components/EventCard";
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

const filteredEvents: Event[] = [];

const Events = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  return (
    <div>
      <div className="flex justify-between max-h-70">
        <div className="flex">
          <SearchAndFilter
            events={events}
            setFilteredEvents={setFilteredEvents}
          />
        </div>
        <button className="btn btn-primary p-2 m-4">Create Event</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
