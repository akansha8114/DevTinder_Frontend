import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';  
import feedReducer from './feedSlice';

const appStore = configureStore({
    reducer:{
        user:userReducer,  //adding user slice to the store
        feed:feedReducer,  //adding feed slice to the store
    },
});

export default appStore;