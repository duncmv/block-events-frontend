import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import EventCard from '../components/EventCard';
import { getMyEvents, getRegisteredEvents } from '../utils/api';

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

interface DashboardProps {
  searchParams: { tab: string };
  myEvents: Event[];
  registeredEvents: Event[];
}

const Dashboard: React.FC<DashboardProps> = async ({ searchParams }) => {
  const token = cookies().get('jwt');

  if (!token || token.value === 'loggedout') {
    redirect('/Login');
  }

  const myEvents = await getMyEvents(token);
  const registeredEvents = await getRegisteredEvents(token);

  const currentTab = searchParams.tab || 'myEvents'; // Default to 'myEvents' if no tab is specified

  const displayedEvents =
    currentTab === 'myEvents' ? myEvents.myEvents : registeredEvents.userRegisteredEvents;

  return (
    <div className="flex h-screen">
      <Sidebar currentTab={currentTab} />
      <div className="flex-1 flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedEvents && displayedEvents.length > 0 ? (
              displayedEvents.map((event: Event, key: number) => (
                <EventCard key={key} event={event} />
              ))
            ) : (
              <p>No events yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  return [{ tab: 'myEvents' }, { tab: 'registeredEvents' }];
}

export default Dashboard;
