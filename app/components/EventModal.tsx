import { useState, useContext, useEffect } from "react";
import { registerEvent } from "../utils/api";

const EventModal = ({ event, register, setRegister }: any) => {
  const media_url = "http://localhost:3300/media/";
  const pics = (event as any).media?.map((pic: string, key: number) => (
    <img key={key} className="w-full" src={media_url + pic} alt="Event image" />
  ));
  const handleRegister = async () => {
    console.log("register: ", register);
    if (register) {
      return;
    }
    console.log(event);

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/Login";
    }
    const res = await registerEvent(token, event._id);
    if (!res.ok) {
      console.log(res);
    } else {
      setRegister(true);
    }
  };

  return (
    <dialog id={event._id} className="modal">
      <div className="modal-box p-0 w-full max-w-screen-lg max-h-[90vh] m-6">
        <div className="hero bg-white flex items-center justify-center">
          <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start lg:justify-between w-full max-w-screen-lg mx-auto py-8">
            <figure className="w-full lg:w-1/2 lg:pr-6 mb-6 lg:mb-0">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                {pics}
              </div>
            </figure>
            <div className="text-center lg:text-left lg:max-w-lg lg:ml-6">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
                {event.title}
              </h1>
              <p className="text-lg text-gray-700 mb-4">{event.description}</p>

              <div className="flex items-center mb-3 text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 mr-2 text-red-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p> {event.location}</p>
              </div>
              <div className="flex items-center mb-3 text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 mr-2 text-red-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <p>{"  " + event.organizer.email}</p>
              </div>
              <div className="py-2 text-gray-800">
                <p>
                  <strong>From:</strong>{" "}
                  {new Date(event.startDateTime).toLocaleString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <strong>To:</strong>{" "}
                  {new Date(event.endDateTime).toLocaleString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  <strong>Organizer:</strong> {event.organizer.name}
                </p>
                <p>
                  <strong>Category:</strong> {event.category}
                </p>
              </div>
              <button
                onClick={register ? undefined : handleRegister}
                className={`btn ${
                  register
                    ? "bg-green-100 text-gray-500 cursor-not-allowed"
                    : "btn-primary text-white"
                } mt-4`}
              >
                {register ? "Registered" : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EventModal;
