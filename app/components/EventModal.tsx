import { useState, useContext, useEffect } from "react";
import { registerEvent } from "../utils/api"


const EventModal = ({ event, register, setRegister }) => {
  const mediaUrl = 'http://localhost:3300/media/';
  const pics = <img src={mediaUrl + event.media} alt="Event Image" />

  const handleRegister = async () => {
    console.log("register: ", register);
    if (register) { return; }
    console.log(event);

    const token = localStorage.getItem('token');

    if (!token || token === 'loggedout') {
      window.location.href = ('/Login')
    }
    const res = await registerEvent(token, event._id);
    if (!res.ok) {
      console.log(res);
    } else {
      setRegister(true);
    }
  }

  return (
    <dialog id={event._id} className="modal">
      <div className="modal-box p-0 w-full max-w-screen-lg max-h-[90vh] m-6">
        <div className="hero bg-white flex items-center justify-center">
          <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start lg:justify-between w-full max-w-screen-lg">
            <figure className="w-full lg:w-1/2">
              {pics}
            </figure>
            <div className="text-center lg:text-left lg:max-w-lg lg:mr-10 mt-8 lg:mt-0">
              <h1 className="text-4xl lg:text-5xl font-bold">
                {event.title}
              </h1>
              <p className="py-2">{event.description}</p>

              <p className="py-2"><strong>Location:</strong> {event.location}</p>
              <p className="py-2"><strong>From:</strong> {new Date(event.startDateTime).toLocaleString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</p>
              <p className="py-2"><strong>To:</strong> {new Date(event.endDateTime).toLocaleString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</p>
              <p className="py-2"><strong>Organizer:</strong> {event.organizer.name}</p>
              <p className="py-2"><strong>Contact:</strong> {event.organizer.email}</p>
              <p className="py-2"><strong>Category:</strong> {event.category}</p>
              <button onClick={register ? undefined : handleRegister} className={register ? "btn bg-green-100 diabled" : "btn btn-primary font-sans text-white"}>
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
}


export default EventModal;
