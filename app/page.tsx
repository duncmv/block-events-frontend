import Image from "next/image";
import Link from "next/link";
import events from "./Events/events";
import EventCard from "./components/EventCard";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero bg-white min-h-screen flex items-center justify-center">
        <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start lg:justify-between w-full max-w-screen-lg">
          <div className="flex-shrink-0 w-full max-w-md lg:max-w-lg">
            <Image
              src="/landing.JPG"
              alt="Landing Image"
              width={500}
              height={500}
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
          </div>
          <div className="text-center lg:text-left lg:max-w-lg lg:mr-10 mt-8 lg:mt-0">
            <h1 className="text-4xl lg:text-5xl font-bold">
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

      {/* Events Carousel Section */}
      <div className="carousel rounded-box p-8 space-x-4 overflow-x-auto flex">
        {events.map((event) => (
          <div
            key={event.id}
            className="carousel-item flex-shrink-0 w-full max-w-xs"
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
