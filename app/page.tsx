import Link from "next/link";
import EventCard from "./components/EventCard";
import { fetchEvents } from "./utils/api";

export default async function Home() {
  const res = await fetchEvents();
  return (
    <div className="min-h-screen">
      <div className="hero h-screen bg-white">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="/landing.JPG" className="max-w-lg rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">
              Discover, Manage, and Enjoy Events
            </h1>
            <p className="py-6">
              Experience effortless event management with Block Events, where
              organizers easily create and manage events and attendees discover
              and register for exciting gatherings, all through our intuitive
              platform.
            </p>
            <Link href="/Login">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-x-hidden">
        <div className="carousel rounded-box">
          <div className="flex overflow-x-auto gap-4 p-4">
            {res.events.map((event: any, key: any) => (
              <div key={key} className="carousel-item flex-shrink-0">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
