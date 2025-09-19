import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
const Profile = () => {
  const user = useSelector((store) => store.user); // to access the user state from the redux store
  return user && (
    <EditProfile user = {user}/>
  )
}

export default Profile