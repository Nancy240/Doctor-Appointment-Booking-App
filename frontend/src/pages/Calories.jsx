import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Calories = () => {
  const [caloriesData, setCaloriesData] = useState({
    daily: 1850,
    weekly: 12950,
    monthly: 55500,
    goal: 2000,
    history: [1750, 1830, 1920, 1680, 1850, 2100, 1820],
    breakdown: {
      bmr: 1380,
      active: 470
    }
  });
  
  // In a real app, you would fetch data from Google Fit API here
  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        // const response = await fetch('your-google-fit-api-endpoint/calories');
        // const data = await response.json();
        // setCaloriesData(data);
      } catch (error) {
        console.error('Error fetching calories data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
        },
      },
      title: {
        display: true,
        text: 'Calories Burned - Last 7 Days',
        color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
      },
    },
    scales: {
      y: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };
  
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'BMR Calories',
        data: Array(7).fill(caloriesData.breakdown.bmr),
        backgroundColor: 'rgba(52, 168, 83, 0.8)',
      },
      {
        label: 'Active Calories',
        data: caloriesData.history.map(total => total - caloriesData.breakdown.bmr),
        backgroundColor: 'rgba(234, 67, 53, 0.8)',
      },
    ],
  };
  
  const progressPercentage = Math.min(Math.round((caloriesData.daily / caloriesData.goal) * 100), 100);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Calories Tracker</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: April 21, 2025</p>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Today's Calories</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{caloriesData.daily.toLocaleString()} <span className="text-xl">kcal</span></p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-orange-500 h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {progressPercentage}% of daily goal ({caloriesData.goal.toLocaleString()} kcal)
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Weekly Calories</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{caloriesData.weekly.toLocaleString()} <span className="text-xl">kcal</span></p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Avg: {Math.round(caloriesData.weekly / 7).toLocaleString()} kcal/day
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Monthly Calories</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{caloriesData.monthly.toLocaleString()} <span className="text-xl">kcal</span></p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Avg: {Math.round(caloriesData.monthly / 30).toLocaleString()} kcal/day
          </p>
        </div>
      </div>
      
      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Bar options={options} data={data} />
      </div>
      
      {/* Calories Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Today's Calories Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Basal Metabolic Rate (BMR)</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white">{caloriesData.breakdown.bmr} kcal</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${(caloriesData.breakdown.bmr / caloriesData.daily) * 100}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Calories</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white">{caloriesData.breakdown.active} kcal</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-red-500 h-2.5 rounded-full" 
                style={{ width: `${(caloriesData.breakdown.active / caloriesData.daily) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                  className="dark:stroke-gray-700"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray={`${(caloriesData.breakdown.bmr / caloriesData.daily) * 100}, 100`}
                  className="stroke-green-500"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                  strokeDasharray={`${(caloriesData.breakdown.active / caloriesData.daily) * 100}, 100`}
                  strokeDashoffset={`-${(caloriesData.breakdown.bmr / caloriesData.daily) * 100}`}
                  className="stroke-red-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{caloriesData.daily}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Total kcal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Calories Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Steps Contribution</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">240 kcal</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Workout Contribution</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">180 kcal</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Fat Burn</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">52 g</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Weekly Trend</p>
            <p className="text-xl font-semibold text-green-500">+3.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calories;
