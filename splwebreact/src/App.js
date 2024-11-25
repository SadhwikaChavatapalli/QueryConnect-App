import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//#region Components
import NavbarComponent from './Components/Navbar/Navbar';
////#endregion

import Login from './Pages/UserManagement/Login';
import Homepage from './Pages/Homepage/Homepage';
import SignUp from './Pages/UserManagement/SignUp';
import AddQuestion from './Pages/AddQuestion';
import ViewQuestion from './Pages/QuestionPage/ViewQuestion';
import './App.css';
import Logout from './Pages/UserManagement/Logout';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onLogout = () => {
    setIsAuthenticated(false);
  }

  return (
    <div>
      <Router>
      <NavbarComponent className="Navbar" isAuthenticated={isAuthenticated} />
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          
          {/* Login Route */}
          <Route path="/logout" element={<Logout onLogout={() => onLogout()} />} />

          {/* Home Route (Visitors are shown this path) */}
          <Route path="/" element= {<Homepage />}
          />

          {/* Add Question Route (Protected) */}
          <Route
            path="/add-question"
            element={isAuthenticated ? <AddQuestion /> : <Navigate to="/" />}
          />

          {/* Edit Question Route (Protected) */}
          <Route
            path="/edit-question/:id"
            element={<AddQuestion />}
          />

          {/* View Question Route (Protected, expects question ID) */}
          <Route
            path="/question/:id"
            element={<ViewQuestion />}
          />

          {/* Sign Up Route */}
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
