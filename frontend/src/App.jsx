import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import VendorDiscovery from './pages/VendorDiscovery';
import VendorProfile from './pages/VendorProfile';
import Venues from './pages/Venues';
import Stories from './pages/Stories';
import Concierge from './pages/Concierge';
import Booking from './pages/Booking';
import BookingSuccess from './pages/Booking/BookingSuccess';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<VendorDiscovery />} />
          <Route path="/vendors/:id" element={<VendorProfile />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/concierge" element={<Concierge />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/success" element={<BookingSuccess />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
