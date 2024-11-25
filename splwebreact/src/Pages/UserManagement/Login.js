import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import axios, { HttpStatusCode } from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (email === 'test@test' && password === 'test') {
  //     onLogin();
  //     navigate('/home');
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    //navigate('/home');
    const inputJson = {
                        "Email": email,
                        "Password":password
                      }

    console.log(inputJson);
    axios.post(`http://localhost:8080/users/authenticate`, inputJson,
      { 
        headers: { 'Content-Type': 'application/json' } 
      }
    ).then(response => {
      console.log(response.data);
      if (response.status !== HttpStatusCode.Ok){
        setErrorMessage("Login failed!");
        setErrorVisible(true);   
        setTimeout(() => { setErrorVisible(false); }, 5000);
      }
      else {
        setAlertMessage(`Welcome, ${response.data.UserName}`);
        setAlertVisible(true);
        localStorage.setItem("user",response.data.UserObjectId);
        onLogin();
        setTimeout(() => { navigate('/'); }, 2000);
      }
      
  })
  .catch(ex => {
    setErrorMessage("Invalid username or password!");
    setErrorVisible(true);   
    setTimeout(() => { setErrorVisible(false); }, 5000);
    return false;
  });
}

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div> 
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
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

export default Login;
