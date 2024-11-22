import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid'; // Updated for Heroicons v2
import QuestionsPage from '../QuestionPage/QuestionsPage';
import './Homepage.css'
import SearchComponent from '../../Components/Search/Search';

const Homepage = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Throttle ResizeObserver to prevent it from firing too often
    const throttle = (fn, limit) => {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          fn.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const observer = new ResizeObserver(
      throttle((entries) => {
        for (let entry of entries) {
          console.log(entry.target); // Handle observed resize events here
        }
      }, 200)
    );

    observer.observe(document.body); // Observe the body for resizing
    return () => observer.disconnect(); // Cleanup the observer
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    // Perform logout actions (clear state, redirect to login, etc.)
    navigate('/');
  };

  return (
    <div Class='content'>
      <div Class='justify-center'>
        <SearchComponent />
      </div>
      
      
      <div className="pt-8">
        <QuestionsPage />
      </div>
      
      {/* <div role="tablist" className="tabs tabs-lifted tabs-lg">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Top Questions" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <QuestionsPage />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 2" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          Tab content 2
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          Tab content 3
        </div>
      </div> */}
    </div>
    
    
  );
};

export default Homepage;
