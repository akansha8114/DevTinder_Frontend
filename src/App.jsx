import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import Body from "./Body"
import Login from "./components/login"
import Profile from "./components/Profile"
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
    <Provider store={appStore}>
       <BrowserRouter basename="/">
        <Routes>
         <Route path = "/" element = {<Body/>}>
         <Route path = "/" element={<Feed/>}></Route>
           <Route path = "login" element = {<Login/>}/>
            <Route path = "profile" element = {<Profile/>}/>
            <Route path = "connections" element = {<Connections/>}/>
            <Route path = "requests" element = {<Requests/>}/>

         </Route>
         
        </Routes>
      </BrowserRouter>
    </Provider>
     
      <h1 className="text-3xl font-bold underline">Hello Aakansha...</h1>
    </>
  );
}

export default App
