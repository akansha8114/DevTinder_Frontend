import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar"
import Body from "./Body"
import Login from "./login"
import Profile from "./Profile"
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./Feed";

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

         </Route>
         
        </Routes>
      </BrowserRouter>
    </Provider>
     
      <h1 className="text-3xl font-bold underline">Hello Aakansha...</h1>
    </>
  );
}

export default App
