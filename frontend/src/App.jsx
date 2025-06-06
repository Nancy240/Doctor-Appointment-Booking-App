import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Doctors from './pages/Doctors.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Appointment from './pages/Appointment.jsx'
import MyAppointments from './pages/MyAppointments.jsx'
import MyProfile from './pages/MyProfile.jsx'
import Footer from './components/Footer.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify.jsx'
import Layout from './components/health_dashboard/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Steps from './pages/Steps.jsx'
import HeartRate from './pages/HeartRate.jsx'
import Calories from './pages/Calories.jsx'
import Weight from './pages/WeightPage.jsx'
import FitnessDashboard from './pages/Fitdashboard.jsx'





const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
        
        {/* Health Dashboard Routes */}
        <Route path='/dashboard' element={<Layout/>}>
          <Route index element={<Dashboard/>} />
          <Route path="steps" element={<Steps/>} />
          <Route path="heart-rate" element={<HeartRate />} />
          <Route path="calories" element={<Calories />} />
          
          <Route path="weight" element={<Weight />} />
          
        </Route>

        <Route path="/health-dashboard" element={<FitnessDashboard/>}/>

      </Routes>
      <Footer />
    </div>
  )
}

export default App
