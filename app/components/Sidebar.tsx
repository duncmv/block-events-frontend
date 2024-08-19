import Link from 'next/link';

const Sidebar = ({ currentTab }) => {
  const getTabName = (tab) => {
    switch (tab) {
      case 'myEvents':
        return 'My Events';
      case 'registeredEvents':
        return 'Registered Events';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div>
      <input type="checkbox" id="menu-toggle" className="hidden" />
      <div className="flex flex-col fixed top-0 left-0 h-screen w-64 bg-neutral text-white transform -translate-x-full transition-transform duration-300 ease-in-out md:translate-x-0 z-50">
        <div className="p-4 flex w-full">
          <Link href="/" className="h-16 px-4 md:px-6 bg-white border-b relative">
            <img src="/logo.png" alt="logo" width={150} height={200} />
          </Link>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">{getTabName(currentTab)}</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href={{ pathname: '/Dashboard', query: { tab: 'myEvents' } }}
                className={`w-full p-2 text-left block rounded-lg ${currentTab === 'myEvents' ? 'bg-accent' : 'bg-accent-content'}`}
              >
                My Events
              </Link>
            </li>
            <li>
              <Link
                href={{ pathname: '/Dashboard', query: { tab: 'registeredEvents' } }}
                className={`w-full p-2 text-left block rounded-lg ${currentTab === 'registeredEvents' ? 'bg-accent' : 'bg-accent-content'}`}
              >
                Registered Events
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center absolute bottom-0 w-full p-4">
          <div className="relative">
            <div className="avatar ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2" >
              <img className=" h-full w-full object-cover rounded-full" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-bold">John Doe</p>
            <p className="text-xs">john.doe@example.com</p>
          </div>
        </div>
      </div>
      <label htmlFor="menu-toggle" className="cursor-pointer p-4 block md:hidden absolute top-4 left-4 z-50">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </label>
    </div>
  );
};

export default Sidebar;
