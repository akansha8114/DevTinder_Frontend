import React from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import  Base_URL  from './utils/constants';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async() =>{
    if(userData) return;
    try{
      const res = await axios.get(Base_URL + "/profile/view" , {
        withCredentials:true,
      });
      dispatch(addUser(res.data));
    }catch(err){
      if(err.status ===401){
        navigate("/login");
      }
      else{
        console.log(err);
      }
    }
  }
  useEffect(()=>{
    fetchUser();
  },[]);

  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body