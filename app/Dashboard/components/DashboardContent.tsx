"use client";

import React, { useState } from 'react';
import EventCard from '../../components/EventCard';

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

interface DashboardContentProps {
  myEvents: Event[];
  regEvents: Event[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ myEvents, regEvents }) => {
  const [activeTab, setActiveTab] = useState<'myEvents' | 'registeredEvents'>('myEvents');

  const eventsToDisplay = activeTab === 'myEvents' ? myEvents : regEvents;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <button
          className={`btn ${activeTab === 'myEvents' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('myEvents')}
        >
          My Events
        </button>
        <button
          className={`btn ${activeTab === 'registeredEvents' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('registeredEvents')}
        >
          Registered Events
        </button>
        <a href="/Events/Create" className="btn btn-primary">Create Event</a>
      </div>
      <div className="border border-gray-300 rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {eventsToDisplay?.length > 0 ? (
            eventsToDisplay.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <p>No events yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
