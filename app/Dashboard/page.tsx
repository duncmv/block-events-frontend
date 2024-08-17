import Link from 'next/link';
import EventCard from '../components/EventCard';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getMyEvents, getRegisteredEvents } from '../utils/api';

async function Dashboard() {
  const token = cookies().get('jwt');

  const myEvents = await getMyEvents(token);
  const registeredEvents = await getRegisteredEvents(token);

  if (!token) {
    redirect('/Login');
  }
  if (token.value === 'loggedout') {
    redirect('/Login');
  }

  const createdEvents = myEvents.myEvents;
  // console.log(createdEvents);
  const regEvents = registeredEvents.userRegisteredEvents;
  // console.log(regEvents);
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">My Events</h2>
            <Link href="/Events/Create" className="btn btn-primary">Create Event</Link>
          </div>
          <div className="border border-gray-300 rounded-sm p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {createdEvents && createdEvents.length > 0 ? (
                createdEvents.map((event: any) => (
                  <EventCard key={event._id} event={event} />
                ))
              ) : (
                <p>No events yet</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Registered Events</h2>
          </div>
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {regEvents && regEvents.length > 0 ? (
                regEvents.map((event: any) => (
                  <EventCard key={event._id} event={event} />
                ))
              ) : (
                <p>No events yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
/* 
<div className="carousel carousel-end rounded-box">
        <div className="carousel-item m-3 px-4">
 
        </div>
      </div> */

export default Dashboard;
