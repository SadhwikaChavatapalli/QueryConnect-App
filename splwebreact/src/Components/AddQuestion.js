import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Question submitted:', question);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Ask a New Question</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here"
                className="textarea textarea-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
