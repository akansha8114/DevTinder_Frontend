import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { removeUser} from '../utils/userSlice';
import Base_URL from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const user = useSelector((store) => store.user); // to access the user state from the redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() =>{
    try{
      await axios.post(Base_URL + "/logout", {}, {withCredentials:true});
      dispatch(removeUser()); // Clear user data from Redux store
      return navigate("/login"); // Redirect to login page
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
       {user &&  <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className = "form-control">Welcome {user.name}</div>
          <div className="dropdown dropdown-end mx-5 flex-items-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={user.photourl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to = "/connections">Connections</Link> 
              </li>
              <li>
                <a onClick = {handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>}
      </div>
  )
}

export default NavBar