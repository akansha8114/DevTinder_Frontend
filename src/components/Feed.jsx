import React from 'react'
import Base_URL from '../utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import UserCard from './UserCard'
import {useSelector,useDispatch} from 'react-redux'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {
  const feed = useSelector ((store) => store.feed);
  const dispatch = useDispatch();
   const getFeed = async() =>{
    if(feed) return;
    const res = await axios.get(Base_URL + "/feed", {withCredentials:true});
    dispatch(addFeed(res?.data?.data));
   }

   useEffect(()=>{
    getFeed();
   },[]);
  

return feed &&  (
  <div className = "flex justify-center my-10">
    <UserCard user = {feed[0]}/>
  </div>
);
};

export default Feed