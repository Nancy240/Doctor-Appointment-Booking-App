import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Steps = () => {
  const [stepsData, setStepsData] = useState({
    daily: 8432,
    weekly: 58600,
    monthly: 254000,
    goal: 10000,
    history: [7500, 8200, 6800, 9100, 8400, 10200, 7900],
  });
  
  // In a real app, you would fetch data from Google Fit API here
  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        // const response = await fetch('your-google-fit-api-endpoint/steps');
        // const data = await response.json();
        // setStepsData(data);
      } catch (error) {
        console.error('Error fetching steps data:', error);
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
        text: 'Daily Steps - Last 7 Days',
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
        label: 'Steps',
        data: stepsData.history,
        borderColor: 'rgba(66, 133, 244, 1)',
        backgroundColor: 'rgba(66, 133, 244, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Goal',
        data: Array(7).fill(stepsData.goal),
        borderColor: 'rgba(234, 67, 53, 1)',
        backgroundColor: 'rgba(234, 67, 53, 0.5)',
        borderDash: [5, 5],
      },
    ],
  };
  
  const progressPercentage = Math.min(Math.round((stepsData.daily / stepsData.goal) * 100), 100);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Steps Tracker</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: April 21, 2025</p>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Today's Steps</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stepsData.daily.toLocaleString()}</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-blue-500 h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {progressPercentage}% of daily goal ({stepsData.goal.toLocaleString()} steps)
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Weekly Steps</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stepsData.weekly.toLocaleString()}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Avg: {Math.round(stepsData.weekly / 7).toLocaleString()} steps/day
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Monthly Steps</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stepsData.monthly.toLocaleString()}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Avg: {Math.round(stepsData.monthly / 30).toLocaleString()} steps/day
          </p>
        </div>
      </div>
      
      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Line options={options} data={data} />
      </div>
      
      {/* Additional Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Steps Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Distance Covered</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">6.4 km</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Calories Burned</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">320 kcal</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Minutes</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">78 min</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Step Cadence</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">108 steps/min</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
