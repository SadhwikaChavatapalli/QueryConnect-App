import React from 'react';
import { useParams } from 'react-router-dom';

const ViewQuestion = () => {
  const { id } = useParams(); // Get question ID from URL

  return (
    <div className="min-h-screen p-6">
      <div className="card shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Question {id}</h2>
          <p>This is a placeholder for the question details.</p>
          <div className="form-control mt-4">
            <textarea placeholder="Type your answer here" className="textarea textarea-bordered"></textarea>
          </div>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Post Answer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;
