import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import Base_URL from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setabout] = useState(user.about);
  const [photourl, setphotourl] = useState(user.photourl);
  const [showToast, setShowToast] = useState(false);    
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError(" ");
    try {
      const res = await axios.patch(
        Base_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photourl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <>
      <div className="flex justify-around items-center my-10 mx-10">
        <div className="flex justify-center items-center h-screen ">
          <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
              <h1 className="card-title justify-center font-bold text-2xl">
                Edit Profile
              </h1>
              <h2 className="card-title">FirstName</h2>
              {/*  Starts inputfield */}
              <div>
                <label className="input validator">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                    placeholder="firstName"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid firstName
                </div>
              </div>
              {/* Ends inputfield */}

              <h2 className="card-title">LastName</h2>
              {/*  Starts inputfield */}
              <div>
                <label className="input validator">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    placeholder="lastName"
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid lastName
                </div>
              </div>
              {/* Ends inputfield */}

              <h2 className="card-title">Age</h2>
              {/*  Starts inputfield */}
              <div>
                <label className="input validator">
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="age"
                    required
                  />
                </label>
                <div className="validator-hint hidden">!!</div>
              </div>
              {/* Ends inputfield */}

              <h2 className="card-title">Gender</h2>
              {/*  Starts inputfield */}
              <div>
                <label className="input validator">
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                    placeholder="gender"
                    required
                  />
                </label>
                <div className="validator-hint hidden">!!</div>
              </div>
              {/* Ends inputfield */}

              <h2 className="card-title">About</h2>
              <div>
                <label className="input validator">
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setabout(e.target.value)}
                    placeholder="Tell us about yourself"
                    required
                  />
                </label>
                <div className="validator-hint hidden">!!</div>
              </div>
              {/* Ends inputfield */}

              <h2 className="card-title">Profile Picture</h2>
              <div>
                <label className="input validator">
                  <input
                    type="text"
                    value={photourl}
                    onChange={(e) => setphotourl(e.target.value)}
                    placeholder="Profile Picture "
                    required
                  />
                </label>
                <div className="validator-hint hidden">!!</div>
              </div>
              {/* Ends inputfield */}

              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, about, photourl }}
        />
      </div>
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile saved successfully.</span>
        </div>
      </div>}
    </>
  );
};

export default EditProfile;
