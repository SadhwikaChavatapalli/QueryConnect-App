import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid'; // Updated for Heroicons v2

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
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Discussions</h1>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center focus:outline-none"
          >
            <UserIcon className="w-6 h-6 text-gray-500" /> {/* Updated User icon */}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search questions..."
          className="input input-bordered flex-grow"
        />
        <button className="btn btn-secondary ml-2">
          Search
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example questions */}
        <div className="card shadow-xl">
          <div className="card-body">
            <h2 className="card-title">What is React?</h2>
            <p>React is a JavaScript library for building user interfaces.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => navigate('/question/1')}>
                View Question
              </button>
            </div>
          </div>
        </div>
        <div className="card shadow-xl">
          <div className="card-body">
            <h2 className="card-title">How does Tailwind CSS work?</h2>
            <p>Tailwind CSS is a utility-first CSS framework.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => navigate('/question/2')}>
                View Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
