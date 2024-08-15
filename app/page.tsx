import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import events from "./Events/events";
import EventCard from "./components/EventCard";

export default function Home() {
  return (
    <div>
      <div className="hero bg-white min-h-screen">
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
              platform
            </p>
            <Link href="/Login">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="carousel carousel-end rounded-box">
        <div className="carousel-item m-3 px-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
