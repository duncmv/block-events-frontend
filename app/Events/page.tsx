"use client";
import { useState, useEffect } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import { fetchEvents } from "../utils/api";
import EventCard from "../components/EventCard";
import Link from "next/link";

const ITEMS_PER_PAGE = 8; // Number of items per page

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page state

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
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between max-h-70">
        <div className="flex md:w-4/5 md:pl-9">
          <SearchAndFilter
            events={allEvents}
            setFilteredEvents={setFilteredEvents}
          />
        </div>
        <div className="flex justify-end">
        <Link
          href={localStorage.getItem("token") ? "/Events/Create" : "/Login"}
          className="btn btn-primary text-white p-2 m-4 hover:scale-105"
        >
          Create Event
        </Link>
        </div>
      </div>

      <div className="flex justify-center items-center md:m-8">
        <div className="mx-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedEvents.map((event, key) => (
            <EventCard key={key} event={event} />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 mb-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 border btn btn-outline ${
              currentPage === index + 1
                ? "text-primary"
                : "text-black-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Events;
