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
  
  const ActivityChart = () => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: document.documentElement.classList.contains('dark') ? 'white' : 'black',
          },
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
          data: [7500, 8200, 6800, 9100, 8400, 10200, 7900],
          backgroundColor: 'rgba(66, 133, 244, 0.8)',
        },
        {
          label: 'Calories',
          data: [1600, 1750, 1500, 1900, 1800, 2100, 1700],
          backgroundColor: 'rgba(234, 67, 53, 0.8)',
        },
      ],
    };
    
    return <Bar options={options} data={data} />;
  };
  
  export default ActivityChart;
  