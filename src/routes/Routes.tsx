import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import NotFound from '../pages/errors/NotFound';

const AppRoutes = () => (
  <Routes>
    <Route path="" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
