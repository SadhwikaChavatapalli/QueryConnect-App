import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Discussions</h1>
        <button
          onClick={() => navigate('/add-question')}
          className="btn btn-primary"
        >
          Add Question
        </button>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search questions..."
          className="input input-bordered flex-grow"
        />
        <button className="btn btn-secondary ml-2">Search</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example questions */}
        <div className="card bg-base-100 shadow-xl">
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
        <div className="card bg-base-100 shadow-xl">
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
