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

const HeartRate = () => {
  const [heartRateData, setHeartRateData] = useState({
    current: 72,
    resting: 62,
    max: 142,
    min: 58,
    avg: 76,
    history: [68, 75, 72, 80, 78, 74, 72],
    zones: {
      rest: 35,
      fat: 25,
      cardio: 30,
      peak: 10
    }
  });
  
  // In a real app, you would fetch data from Google Fit API here
  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        // const response = await fetch('your-google-fit-api-endpoint/heart-rate');
        // const data = await response.json();
        // setHeartRateData(data);
      } catch (error) {
        console.error('Error fetching heart rate data:', error);
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
        text: 'Heart Rate - Last 7 Days',
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
        label: 'Average BPM',
        data: heartRateData.history,
        borderColor: 'rgba(234, 67, 53, 1)',
        backgroundColor: 'rgba(234, 67, 53, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Resting BPM',
        data: Array(7).fill(heartRateData.resting),
        borderColor: 'rgba(52, 168, 83, 1)',
        backgroundColor: 'rgba(52, 168, 83, 0.5)',
        borderDash: [5, 5],
      },
    ],
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Heart Rate Monitor</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: April 21, 2025</p>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Current</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">{heartRateData.current} <span className="text-xl">bpm</span></p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Resting</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">{heartRateData.resting} <span className="text-xl">bpm</span></p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Average</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">{heartRateData.avg} <span className="text-xl">bpm</span></p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Range</h3>
          <p className="text-3xl font-bold text-purple-500 mt-2">{heartRateData.min}-{heartRateData.max} <span className="text-xl">bpm</span></p>
        </div>
      </div>
      
      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Line options={options} data={data} />
      </div>
      
      {/* Heart Rate Zones */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Heart Rate Zones</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Rest Zone (50-60% max HR)</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{heartRateData.zones.rest}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${heartRateData.zones.rest}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Fat Burn Zone (60-70% max HR)</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{heartRateData.zones.fat}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${heartRateData.zones.fat}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Cardio Zone (70-80% max HR)</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{heartRateData.zones.cardio}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${heartRateData.zones.cardio}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Peak Zone (80-100% max HR)</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{heartRateData.zones.peak}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${heartRateData.zones.peak}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Heart Rate Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Variability (HRV)</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">48 ms</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Recovery Rate</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">Good</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stress Level</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">Medium</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cardio Fitness Score</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">Above Average</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartRate;
