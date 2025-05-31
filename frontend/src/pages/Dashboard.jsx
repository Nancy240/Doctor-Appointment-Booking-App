import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiBarChart2, FiHeart, FiZap, 
  FiMoon, FiActivity, FiUser 
} from 'react-icons/fi';
import StatsCard from '../components/health_dashboard/StatsCard';
import ActivityChart from '../components/health_dashboard/ActivityChart';
import WeeklyProgress from '../components/health_dashboard/WeeklyProgress';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    steps: 8432,
    heartRate: 72,
    calories: 1850,
    sleep: 7.5,
    weight: 68.5,
    activities: 3
  });
  
  // In a real app, you would fetch data from Google Fit API here
  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        // const response = await fetch('your-google-fit-api-endpoint');
        // const data = await response.json();
        // setUserData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const stats = [
    { name: 'Steps', value: userData.steps, icon: FiBarChart2, color: 'bg-blue-500', href: '/steps' },
    { name: 'Heart Rate', value: `${userData.heartRate} bpm`, icon: FiHeart, color: 'bg-red-500', href: '/heart-rate' },
    { name: 'Calories', value: `${userData.calories} kcal`, icon: FiZap, color: 'bg-orange-500', href: '/calories' },
    
    { name: 'Weight', value: `${userData.weight} kg`, icon: FiActivity, color: 'bg-green-500', href: '/weight' },
    { name: 'Activities', value: userData.activities, icon: FiUser, color: 'bg-purple-500', href: '/activities' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: April 21, 2025</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.name} to={stat.href}>
            <StatsCard stat={stat} />
          </Link>
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Weekly Activity</h3>
          <ActivityChart />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Progress Overview</h3>
          <WeeklyProgress />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

