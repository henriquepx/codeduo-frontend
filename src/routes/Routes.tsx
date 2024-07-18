import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages//Register/Register';
import Room from '../pages/Room/Room';
import Home from '../pages/Home/Home';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/room/:roomId" element={<Room />} />
  </Routes>
);

export default AppRoutes;
