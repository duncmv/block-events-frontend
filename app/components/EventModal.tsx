import { registerEvent } from "../utils/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface Event {
  _id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  media: string;
  category: string;
  attendees: string[];
  status: string;
  organizer: {
    name: string;
    address: string;
    email: string;
  };
}
interface EventModalProps {
  event: Event;
  register?: boolean;
  setRegister: any;
}
const EventModal = ({ event, register, setRegister }: EventModalProps) => {
  const mediaUrl = 'http://localhost:3300/media/';
  const pics = <img src={mediaUrl + event.media} alt="Event Image" />

  const router = useRouter();
  const handleRegister = async () => {
    // console.log("register: ", register);
    if (register) {
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/Login";
    }
    const res = await registerEvent(token, event._id);
    if (res.status === 401) {
      localStorage.removeItem("token");
      router.push("/Login");
    } else {
      setRegister(true);
    }
  };

  const handleScrollToTop = () => {
    const modalElement = document.getElementById(event._id);
    if (modalElement) {
      modalElement.scrollTop = 0;
    }
  };

  useEffect(() => {
    handleScrollToTop();
  }, []);

  return (
    <dialog id={event._id} className="modal">
      <div className="modal-box p-0 w-4/5 md:w-2/3 sm:w-1/2 lg:w-2/3  max-w-screen-lg max-h-[90vh] m-6">
        <div className="hero bg-white flex items-center justify-center">
          <div className="hero-content flex flex-col lg:flex-row-reverse items-center lg:items-start lg:justify-between w-full max-w-screen-lg mx-auto py-8">
            <figure className="xl:w-full lg:w-[95%] flex items-center justify-center mb-6 lg:mb-0 ">
              {/* <div className="relative overflow-hidden rounded-lg shadow-lg"> */}
              {pics}
              {/* </div> */}
            </figure>
            <div className="text-center lg:text-left lg:max-w-lg lg:ml-6">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold">
                {event.title}
              </h1>
              <p className="text-lg text-gray-700 mb-4">{event.description}</p>
              <button
                onClick={register ? undefined : handleRegister}
                className={`btn ${register
                  ? "bg-green-100 text-gray-500 cursor-not-allowed"
                  : "btn-primary text-white"
                  } mt-4 mb-4`}
              >
                {register ? "Registered" : "Register"}
              </button>

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
              <div className="py-2 text-left text-gray-800">
                <div className="flex items-center text-gray-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 text-red-900">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>

                  <span>
                    {new Date(event.startDateTime).toLocaleString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 text-red-900">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                  </svg>

                  <span>
                    {new Date(event.endDateTime).toLocaleString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 text-red-900">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                  <span>{event.organizer.name}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 text-red-900">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                  </svg>

                  <span>{event.category}</span>
                </div>
              </div>
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
