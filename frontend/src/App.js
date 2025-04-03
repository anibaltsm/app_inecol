import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './components/Auth/Login';
import Dashboard from './pages/Dashboard';
import Tables from './pages/Tables';
import ApiTest from './pages/TestConnection.js';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/tables" element={<PrivateRoute><Tables /></PrivateRoute>} />
              <Route path="/api-test" element={<PrivateRoute><ApiTest /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;