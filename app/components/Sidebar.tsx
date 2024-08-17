import Link from 'next/link';

interface SidebarProps {
  currentTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab }) => {
    const getTabName = (tab: string) => {
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
    <div className="w-64 bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">{getTabName(currentTab)}</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href={{ pathname: '/Dashboard', query: { tab: 'myEvents' } }}
            className={`w-full p-2 text-left ${currentTab === 'myEvents' ? 'bg-gray-300' : 'bg-gray-200'}`}
          >
            My Events
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: '/Dashboard', query: { tab: 'registeredEvents' } }}
            className={`w-full p-2 text-left ${currentTab === 'registeredEvents' ? 'bg-gray-300' : 'bg-gray-200'}`}
          >
            Registered Events
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
