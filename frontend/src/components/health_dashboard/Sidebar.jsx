import { Link, useLocation } from 'react-router-dom';
import {
  FiHome, FiBarChart2, FiHeart, FiZap,
  FiMoon, FiActivity, FiUser, FiX
} from 'react-icons/fi';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Steps', href: '/dashboard/steps', icon: FiBarChart2 },
    { name: 'Heart Rate', href: '/dashboard/heart-rate', icon: FiHeart },
    { name: 'Calories', href: '/dashboard/calories', icon: FiZap },
    { name: 'Weight', href: '/dashboard/weight', icon: FiActivity },
   
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>

        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-white dark:bg-gray-800 shadow-xl">
          <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold text-primary">Fitness Dashboard</h2>
            <button
              className="rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${location.pathname === item.href
                    ? 'bg-gray-100 text-primary dark:bg-gray-700 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center h-16 px-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold text-primary">Fitness Dashboard</h2>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${location.pathname === item.href
                      ? 'bg-gray-100 text-primary dark:bg-gray-700 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
