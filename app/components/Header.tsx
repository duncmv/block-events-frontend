import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={150} height={200} />
      </Link>
      <nav className="flex justify-end">
        <Link
          href="/Events"
          className="px-4 py-2 hover:text-red-900 font-medium"
        >
          Events
        </Link>
        <Link
          href="/Dashboard"
          className="px-4 py-2 hover:text-red-900 font-medium"
        >
          Dashboard
        </Link>
        <Link
          href="/Services"
          className="px-4 py-2 hover:text-red-900 font-medium"
        >
          Services
        </Link>
        <Link
          href="/About"
          className="px-4 py-2 hover:text-red-900 font-medium"
        >
          About Us
        </Link>
        <Link
          href="Events/Create"
          className="px-4 py-2 hover:text-red-900 font-medium"
        >
          Create Event
        </Link>
        <Link
          href="/Login"
          className="px-4 py-2 hover:text-red-900 font-medium"
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
}
