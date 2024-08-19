import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TableOne from '../components/TableOne';
import NotificationSidebar from '../components/NotificationSidebar';
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
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 shadow-md">
        <Sidebar currentTab={currentTab} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 mb-4 flex flex-col">
        <div className="flex-1 bg-white border border-gray-300 rounded-lg p-4 flex flex-col">
            <TableOne
              events={paginatedEvents}
              currentPage={currentPage}
              totalPages={totalPages}
              currentTab={currentTab}
            />
        </div>
      </main>

      {/* Right Sidebar (Notification Sidebar) */}
      <aside className="w-64 bg-gray-100 p-2 shadow-lg">
        <NotificationSidebar />
      </aside>
    </div>
  );
};

export async function generateStaticParams() {
  return [{ tab: 'myEvents' }, { tab: 'registeredEvents' }];
}

export default Dashboard;
