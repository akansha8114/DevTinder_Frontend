import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Base_URL from '../utils/constants'

const Connections = () => {
  const fetchConnections = async()=>{
    try{
        const res = await axios.get(Base_URL + "user/connections",{
            withCredentials:true,
        });
        console.log(res);
    }catch(err){
        //handle error
        console.log(err);
    }
  };
  useEffect(()=>{
    fetchConnections();
  },[]);
};

export default Connections;