import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//#region Components
import NavbarComponent from './Components/Navbar/Navbar';
////#endregion

import Login from './Pages/Login';
import Homepage from './Pages/Homepage/Homepage';
import SignUp from './Pages/SignUp';
import AddQuestion from './Pages/AddQuestion';
import ViewQuestion from './Pages/ViewQuestion';
import './App.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // For login state

  return (
    <div>
      <Router>
      <NavbarComponent className="Navbar"/>
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
    </div>
  );
}

export default App;
