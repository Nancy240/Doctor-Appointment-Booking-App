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
  
  const WeeklyProgress = () => {
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
    
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Weight (kg)',
          data: [70.2, 69.5, 68.9, 68.5],
          borderColor: 'rgba(52, 168, 83, 1)',
          backgroundColor: 'rgba(52, 168, 83, 0.5)',
        },
        {
          label: 'Sleep (hrs)',
          data: [6.5, 7.0, 7.2, 7.5],
          borderColor: 'rgba(251, 188, 5, 1)',
          backgroundColor: 'rgba(251, 188, 5, 0.5)',
        },
        {
          label: 'Heart Rate (bpm)',
          data: [75, 74, 73, 72],
          borderColor: 'rgba(234, 67, 53, 1)',
          backgroundColor: 'rgba(234, 67, 53, 0.5)',
        },
      ],
    };
    
    return <Line options={options} data={data} />;
  };
  
  export default WeeklyProgress;
  