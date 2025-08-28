import { useState } from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';
import  Base_URL  from './utils/constants';


const Login = () => {
  const [Email, setEmail] = useState("aakansha@gmail.com");
  const [Password, setPassword] = useState("Aakansha@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = async () => {
    
    try {
      const res = await axios.post(
        Base_URL +"/login",
        {
          email: Email,
          password: Password,
        },
        {
          withCredentials: true, // ✅ must be in config (3rd arg)
          // headers: { "Content-Type": "application/json" }, // optional
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data));    // dispatch action means send data to the redux store
      return navigate("/");  // after login redirect to home page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h1 className="card-title justify-center font-bold text-2xl">
            Login
          </h1>
          <h2 className="card-title">Enter your email</h2>
          {/*  Starts inputfield */}
          <div>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@site.com"
                required
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>

            {/* Ends inputfield */}
            <h2 className="card-title my-2">Password</h2>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="text"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
            </label>
            <div className="validator-hint hidden">Enter valid Password</div>
          </div>
          <div className="card-actions justify-center">
            <button className="btn" onClick={handlelogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;