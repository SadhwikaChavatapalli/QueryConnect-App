import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Homepage from './Components/Homepage';
import SignUp from './Components/SignUp';
import AddQuestion from './Components/AddQuestion';
import ViewQuestion from './Components/ViewQuestion';
import './App.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // For login state

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

        {/* Home Route (Protected, redirects to login if not authenticated) */}
        <Route
          path="/home"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/" />}
        />

        {/* Add Question Route (Protected) */}
        <Route
          path="/add-question"
          element={isAuthenticated ? <AddQuestion /> : <Navigate to="/" />}
        />

        {/* View Question Route (Protected, expects question ID) */}
        <Route
          path="/question/:id"
          element={isAuthenticated ? <ViewQuestion /> : <Navigate to="/" />}
        />

        {/* Sign Up Route */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
