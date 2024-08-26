import React from "react";
interface Author {
  name: string;
  role: string;
  image: string; // URL to the avatar image
  description: string;
}

const authors: Author[] = [
  {
    name: "Nebiyou Belaineh",
    role: "Full-stack Developer",
    image: "/nebiyou.jpg",
    description:
      "Nebiyou is a full-stack developer that was instrumental with project planning and implementation ensuring that the project was successful.",
  },
  {
    name: "Duncan Asiimwe",
    role: "Full-stack Developer",
    image: "/duncan.jpg",
    description:
      "Duncan specialized in backend development, focusing on creating robust and scalable server-side solutions. He also contributed in frontend development.",
  },
  {
    name: "Chaith Dridi",
    role: "Full-Stack Developer",
    image: "/chaith.jpg",
    description:
      "Chaith ensured that the app is both visually appealing and user-friendly with invaluable input on both backend and frontend sections of the stack.",
  },
];

const Authors: React.FC = () => {
  return (
    <div>
      <div className="p-2 md:p-8">
        <h1 className="text-3xl font-bold text-red-900 mt-2 mb-6 text-center">
          Meet the Team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <img
                src={author.image}
                alt={author.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h2 className="text-xl text-red-900 font-semibold mb-2">
                {author.name}
              </h2>
              <p className="text-gray-600 mb-2">{author.role}</p>
              <p className="text-gray-800 text-center">{author.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="m-8">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start mb-10 md:text-end bg-white rounded-lg p-4">
              <time className="font-mono italic">29 July</time>
              <div className="text-lg font-semibold text-red-900">
                Project Pitch
              </div>
              The team came together for the first time to discus the portfolio
              project. After several meetings and deliberations we came settled
              with an Events management platform. We then decided on the
              technologies which include Mongodb, Express.js, Next.js,
              TailwindCSS among others.
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end mb-10 bg-white rounded-lg p-4">
              <time className="font-mono italic">9 August</time>
              <div className="text-lg font-semibold text-red-900">
                Backend Dev
              </div>
              The team embarked on building the project starting with the
              backend. This involved making a RESTAPI with express that
              interacted with a Mongodb database to serve the frontend. We
              implemented Authentication with JWT and an email service with
              nodemailer as well as all the necessary routes
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start mb-10 md:text-end  bg-white rounded-lg p-4">
              <time className="font-mono italic">14 August</time>
              <div className="text-lg font-semibold text-red-900">
                Frontend Dev
              </div>
              Once that was done we had to implement the frontend. This daunting
              task involved us learning the Next.js framework as well as
              tailwindCSS classes. We did what we could with the time we had.
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end mb-10  bg-white rounded-lg p-4">
              <time className="font-mono italic">Now</time>
              <div className="text-lg font-semibold text-red-900">
                Block Events
              </div>
              Here we are now, we hope this satisfies the requirements of the
              Portfolio project and made for a lovely presentation. Thanks to
              everone at ALX.
            </div>
            <hr />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Authors;
