import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams} from 'react-router-dom'; // Import Link
import axios, { HttpStatusCode } from 'axios';

const SignUp = ({ onLogin }) => {
  const { id } = useParams(); // Get question ID from URL

  useEffect(()=> {
    
    if (id !== undefined){
      axios.get(`http://localhost:8080/users/user?userid=${id}`)
            .then(response => {
                setUserName(response.data.UserName);
                setEmail(response.data.Email);
                setPassword(response.data.Password);
                setConfirmPassword(response.data.Password);
            });
    }
  },[id])

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //navigate('/home');
      if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setErrorVisible(true); 
    }
    const inputJson = {
                        "UserName": userName, 
                        "Email": email,
                        "Password": password,
                        "UserRole": 'contributor',
                        "UserRoleClass": 2,
                        "level":  2
                      }

    console.log(inputJson);
    axios.post(`http://localhost:8080/users`, inputJson,
      { 
        headers: { 'Content-Type': 'application/json' } 
      }
    ).then(response => {
      console.log(response.data);
      if (response.status !== HttpStatusCode.Created){
        setErrorMessage("Error creating your profile!");
        setErrorVisible(true);   
        setTimeout(() => { setErrorVisible(false); }, 5000);
      }
      else {
        setAlertMessage(`Great, ${userName}! You are now a part of QueryConnect!`);
        setAlertVisible(true);
        localStorage.setItem("user",response.data.UserObjectId);
        localStorage.setItem("userRoleClass", response.data.UserRoleClass);
        onLogin();
        setTimeout(() => { navigate('/'); }, 2000);
      }
      
  })
  .catch(ex => {
    setErrorMessage("Error creating your profile!");
    setErrorVisible(true);   
    setTimeout(() => { setErrorVisible(false); }, 5000);
    return false;
  });
}



  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          {id === undefined && <h2 className="card-title">Sign Up</h2>}
          {id !== undefined && <h2 className="card-title">User Profile</h2>}
          <form onSubmit={handleSubmit}>
          <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6 py-12">
              <button type="submit" className="btn btn-primary">Sign Up</button>
              {alertVisible && ( <div className="flex alert alert-success"> <span>{alertMessage}</span> </div>)}
              {errorVisible && ( <div className="flex alert alert-error"> <span>{errorMessage}</span> </div>)}
            </div>
          </form>

          {/* Fix href issue with Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="link link-primary">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SignUp;
