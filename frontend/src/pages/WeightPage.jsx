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

const Weight = () => {
  const [weightData, setWeightData] = useState({
    current: 68.5,
    previous: 70.2,
    goal: 65,
    bmi: 23.6,
    bodyFat: 18.5,
    history: [70.2, 69.8, 69.5, 69.1, 68.7, 68.5, 68.5],
    measurements: {
      chest: 92,
      waist: 81,
      hips: 94,
      thigh: 56,
      arm: 32
    }
  });
  
  // In a real app, you would fetch data from Google Fit API here
  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      try {
        // const response = await fetch('your-google-fit-api-endpoint/weight');
        // const data = await response.json();
        // setWeightData(data);
      } catch (error) {
        console.error('Error fetching weight data:', error);
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
        text: 'Weight Trend - Last 7 Days',
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
        min: Math.min(...weightData.history) - 2,
        max: Math.max(...weightData.history) + 2,
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
        label: 'Weight (kg)',
        data: weightData.history,
        borderColor: 'rgba(52, 168, 83, 1)',
        backgroundColor: 'rgba(52, 168, 83, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Goal',
        data: Array(7).fill(weightData.goal),
        borderColor: 'rgba(251, 188, 5, 1)',
        backgroundColor: 'rgba(251, 188, 5, 0.5)',
        borderDash: [5, 5],
      },
    ],
  };
  
  const weightChange = weightData.current - weightData.previous;
  const progressToGoal = ((weightData.previous - weightData.current) / (weightData.previous - weightData.goal)) * 100;
  const progressPercentage = Math.min(Math.max(progressToGoal, 0), 100);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Weight Tracker</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: April 21, 2025</p>
      </div>
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Current Weight</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{weightData.current} <span className="text-xl">kg</span></p>
          <p className="text-sm font-medium mt-2">
            <span className={`${weightChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
              {weightChange < 0 ? '▼' : '▲'} {Math.abs(weightChange).toFixed(1)} kg
            </span>
            <span className="text-gray-500 dark:text-gray-400"> from last week</span>
          </p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {progressPercentage.toFixed(1)}% towards goal ({weightData.goal} kg)
            </p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">BMI</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{weightData.bmi}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {weightData.bmi < 18.5 ? 'Underweight' : 
             weightData.bmi < 25 ? 'Normal weight' : 
             weightData.bmi < 30 ? 'Overweight' : 'Obese'}
          </p>
          <div className="mt-4 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="relative h-full">
              <div className="absolute h-full w-1 bg-red-500 rounded-full" style={{ left: '18.5%' }}></div>
              <div className="absolute h-full w-1 bg-red-500 rounded-full" style={{ left: '25%' }}></div>
              <div className="absolute h-full w-1 bg-red-500 rounded-full" style={{ left: '30%' }}></div>
              <div className="absolute h-3.5 w-3.5 rounded-full bg-blue-500 transform -translate-y-1/4" style={{ left: `${(weightData.bmi / 40) * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">Body Fat</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{weightData.bodyFat}%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            {weightData.bodyFat < 10 ? 'Essential fat' : 
             weightData.bodyFat < 20 ? 'Athletic' : 
             weightData.bodyFat < 25 ? 'Fitness' : 
             weightData.bodyFat < 32 ? 'Average' : 'Obese'}
          </p>
        </div>
      </div>
      
      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Line options={options} data={data} />
      </div>
      
      {/* Body Measurements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Body Measurements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Chest</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{weightData.measurements.chest} cm</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Waist</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{weightData.measurements.waist} cm</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Hips</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{weightData.measurements.hips} cm</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Thigh</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{weightData.measurements.thigh} cm</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Arm</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{weightData.measurements.arm} cm</p>
          </div>
        </div>
      </div>
      
      {/* Weight Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Weight Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ideal Weight Range</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">62.5 - 67.8 kg</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Waist-to-Hip Ratio</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{(weightData.measurements.waist / weightData.measurements.hips).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Basal Metabolic Rate</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">1,580 kcal/day</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Weekly Trend</p>
            <p className="text-xl font-semibold text-green-500">-0.24 kg/week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weight;
