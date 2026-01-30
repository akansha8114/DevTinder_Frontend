import React from 'react'
import { useLocation,Outlet, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar'
import  {Base_URL}  from './utils/constants';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import { useEffect } from 'react'
import Footer from './components/Footer'

const Body = () => {
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user); // to access the user state from the redux store
  //after reloading the page this function fetch logged in user data from the server
  const fetchUser = async() =>{
    if(userData) return;
    try{
      const res = await axios.get(Base_URL + "/profile/view" , {
        withCredentials:true,
      });
      dispatch(addUser(res.data));
    }catch(err){
      if (err.response?.status === 401){
        navigate("/login");
      }
      else{
        console.log(err);
      }
    }
  };
  useEffect(()=>{
     if (location.pathname === "/login") return;
    fetchUser();
  },[location.pathname]);


  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  );
};

export default Body;