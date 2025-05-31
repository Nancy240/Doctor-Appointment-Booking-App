import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const FitnessDashboard = () => {
  const [accessToken, setAccessToken] = useState(() => 
    localStorage.getItem('accessToken') || ''
  );
  const [fitnessData, setFitnessData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = async () => {
    const response = await fetch('http://localhost:4000/auth-url');
    const { url } = await response.json();
    window.location.href = url;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('access_token');
    
    if (token) {
      localStorage.setItem('accessToken', token);
      setAccessToken(token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetch(`http://localhost:4000/fit/aggregate?access_token=${accessToken}`)
        .then(res => res.json())
        .then(data => {
          setFitnessData(data);
          setLoading(false);
        });
    }
  }, [accessToken]);

  

  if (loading && accessToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        {!accessToken ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            onClick={handleLogin}
          >
            Connect Google Fit
          </motion.button>
        ) : (
          <div className="flex space-x-8">
            <h2 className="text-xl font-semibold">Health Dashboard</h2>
          </div>
        )}
      </nav>

      {accessToken && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium mb-4">Daily Steps</h3>
            <LineChart width={500} height={300} data={fitnessData}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="step_count" 
                stroke="#3B82F6" 
                strokeWidth={2}
              />
            </LineChart>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium mb-4">Heart Rate</h3>
            <BarChart width={500} height={300} data={fitnessData}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar 
                dataKey="heart_rate" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium mb-4">Health Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Sleep</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    fitnessData.reduce((a,b) => a + b.sleep_hours, 0) / 
                    fitnessData.length
                  )} hrs
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Body Fat</p>
                <p className="text-2xl font-bold">
                  {fitnessData[0]?.body_fat_in_percent?.toFixed(1)}%
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Weight</p>
                <p className="text-2xl font-bold">
                  {fitnessData[0]?.weight?.toFixed(1)} kg
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Blood Pressure</p>
                <p className="text-2xl font-bold">
                  {fitnessData[0]?.blood_pressure?.join('/')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default FitnessDashboard;

