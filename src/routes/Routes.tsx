import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Room from '../pages/Room';
import Home from '../pages/Home';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={<Home />} />
    <Route path="/room/:roomId" element={<Room />} />
  </Routes>
);

export default AppRoutes;
