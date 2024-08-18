"use client";
import { useState, useEffect } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import { fetchEvents } from "../utils/api";
import EventCard from "../components/EventCard";
import Link from "next/link";

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await fetchEvents();
        setAllEvents(res.events);
        setFilteredEvents(res.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between max-h-70">
        <div className="flex">
          <SearchAndFilter
            events={allEvents}
            setFilteredEvents={setFilteredEvents}
          />
        </div>
          <Link href={localStorage.getItem('token') ? "/Events/Create" : "/Login"} className="btn btn-primary text-white p-2 m-4">Create Event</Link >
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEvents.map((event: any, key: number) => (
          <EventCard key={key} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
