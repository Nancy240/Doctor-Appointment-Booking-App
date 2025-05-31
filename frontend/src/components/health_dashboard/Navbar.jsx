import { useState, useEffect } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FiMoon, FiSun, FiBell } from 'react-icons/fi';

const Navbar = ({ setSidebarOpen }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  return (
    <header className="sticky top-0 z-10 flex items-center h-16 bg-white dark:bg-gray-800 shadow-sm px-4 md:px-6">
      <button
        className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
        onClick={() => setSidebarOpen(true)}
      >
        <HiOutlineMenuAlt2 className="h-6 w-6" />
      </button>
      
      <div className="flex-1 flex justify-between items-center ml-4 lg:ml-0">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Google Fit Analytics</h1>
        
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <FiSun className="h-6 w-6" />
            ) : (
              <FiMoon className="h-6 w-6" />
            )}
          </button>
          
          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
            <FiBell className="h-6 w-6" />
          </button>
          
          <div className="relative">
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User profile"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
