import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid'; // Updated for Heroicons v2
import QuestionsPage from '../QuestionPage/QuestionsPage';
import './Homepage.css'
import SearchComponent from '../../Components/Search/Search';

const Homepage = () => {
  const navigate = useNavigate();
  // const [showDropdown, setShowDropdown] = useState(false);

  // useEffect(() => {
  //   // Throttle ResizeObserver to prevent it from firing too often
  //   const throttle = (fn, limit) => {
  //     let inThrottle;
  //     return function () {
  //       const args = arguments;
  //       const context = this;
  //       if (!inThrottle) {
  //         fn.apply(context, args);
  //         inThrottle = true;
  //         setTimeout(() => (inThrottle = false), limit);
  //       }
  //     };
  //   };

  //   const observer = new ResizeObserver(
  //     throttle((entries) => {
  //       for (let entry of entries) {
  //         console.log(entry.target); // Handle observed resize events here
  //       }
  //     }, 200)
  //   );

  //   observer.observe(document.body); // Observe the body for resizing
  //   return () => observer.disconnect(); // Cleanup the observer
  // }, []);

  // const toggleDropdown = () => setShowDropdown(!showDropdown);

  // const handleLogout = () => {
  //   // Perform logout actions (clear state, redirect to login, etc.)
  //   navigate('/');
  // };

  return (
    <div Class='content'>
      {/* <div Class='justify-center'>
        <SearchComponent />
      </div> */}
      
      
      <div className="pt-8">
        <QuestionsPage />
      </div>
    </div>
    
    
  );
};

export default Homepage;
