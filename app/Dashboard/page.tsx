import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TableOne from '../components/Table';
import { getMyEvents, getRegisteredEvents } from '../utils/api';

const ITEMS_PER_PAGE = 6;

const Dashboard = async ({ searchParams }) => {
  const token = cookies().get('jwt');

  if (!token || token.value === 'loggedout') {
    redirect('/Login');
  }

  const myEvents = await getMyEvents(token);
  const registeredEvents = await getRegisteredEvents(token);

  const currentTab = searchParams.tab || 'myEvents';
  const currentPage = parseInt(searchParams.page) || 1;

  const displayedEvents =
    currentTab === 'myEvents' ? myEvents.myEvents : registeredEvents.userRegisteredEvents;

  const totalPages = Math.ceil(displayedEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = displayedEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex h-screen">
      <Sidebar currentTab={currentTab} />
      <div className="flex-1 flex flex-col gap-4 p-4 md:ml-64 transition-all duration-300">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedEvents && paginatedEvents.length > 0 ? (
              <div className="col-span-12 xl:col-span-8">
                <TableOne
                  events={paginatedEvents}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  currentTab={currentTab}
                />
              </div>
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
