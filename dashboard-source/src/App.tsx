import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/DashboardLayout';
import Inquiries from './pages/Inquiries';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('demo_authed') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}



function App() {
  return (
    <BrowserRouter basename="/dashboard-app">
      <Routes>
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Inquiries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
