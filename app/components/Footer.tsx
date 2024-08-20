import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-black p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <aside className="flex items-center mb-4 md:mb-0 mr-20">
          <Image
            key="logo2"
            src="/icon.png"
            alt="logo"
            width={50}
            height={50}
          />
          <p className="ml-4">Copyright © {year} - All rights reserved</p>
        </aside>
        <nav className="flex space-x-4">
          <a
            href="https://github.com/duncmv/block-events-frontend"
            aria-label="GitHub"
            className="text-black hover:text-red-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.8-.25.8-.56v-1.93c-3.21.7-3.87-1.55-3.87-1.55-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.21 1.78 1.21 1.04 1.77 2.73 1.26 3.39.96.1-.75.41-1.26.74-1.55-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.45.12-3.03 0 0 .96-.31 3.15 1.18a10.83 10.83 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.74.12 3.03.73.8 1.18 1.82 1.18 3.08 0 4.42-2.71 5.39-5.29 5.67.42.36.8 1.1.8 2.22v3.29c0 .31.22.66.8.56C20.21 21.38 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"></path>
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
