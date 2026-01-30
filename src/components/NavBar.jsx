import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { Base_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const NavBar = () => {
  const user = useSelector((store) => store.user); // to access the user state from the redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(Base_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser()); // Clear user data from Redux store
      return navigate("/login"); // Redirect to login page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👩‍💻 DevTinder
        </Link>
      </div>
      {user && (
        
        <div className="flex-none gap-2">
          <div className="form-control">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:scale-105 transition"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"}
                  alt="Profile"
                />
                {/* <img alt="user photo" src={user.photourl} /> */}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>

              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default NavBar;
