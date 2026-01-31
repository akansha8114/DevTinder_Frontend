import React from 'react'
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import NavBar from './components/NavBar'
import { Base_URL } from './utils/constants';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import { useEffect, useState } from 'react'
import Footer from './components/Footer'
const Body = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();
const userData = useSelector((store) => store.user);
const [isLoading, setIsLoading] = useState(true);
const [pageTransition, setPageTransition] = useState(false);
const fetchUser = async () => {
if (userData) {
setIsLoading(false);
return;
}
try {
const res = await axios.get(Base_URL + "/profile/view", {
withCredentials: true,
});
dispatch(addUser(res.data));
} catch (err) {
if (err.response?.status === 401) {
navigate("/login");
} else {
console.log(err);
}
} finally {
setIsLoading(false);
}
};
useEffect(() => {
if (location.pathname === "/login") {
setIsLoading(false);
return;
}
fetchUser();
}, [location.pathname]);
// Page transition effect
useEffect(() => {
setPageTransition(true);
const timer = setTimeout(() => setPageTransition(false), 300);
return () => clearTimeout(timer);
}, [location.pathname]);
// Loading screen
if (isLoading) {
return (
<div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-300
flex items-center justify-center relative overflow-hidden">
{/* Animated background elements */}
<div className="absolute inset-0 overflow-hidden">
<div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl
animate-pulse"></div>
<div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/5 rounded-full
blur-3xl animate-pulse delay-700"></div>
</div>
{/* Loading spinner */}
<div className="relative z-10 flex flex-col items-center gap-6">
<div className="relative">
<div className="w-20 h-20 border-4 border-primary/30 rounded-full"></div>
<div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full
animate-spin absolute top-0 left-0"></div>
</div>
<div className="flex flex-col items-center gap-2">
<h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary
bg-clip-text text-transparent">
DevTinder
</h2>
<p className="text-sm text-base-content/60 animate-pulse">Loading your
experience...</p>
</div>
</div>
</div>
);
}
return (
<div className="min-h-screen flex flex-col bg-gradient-to-br from-base-300 via-base-200
to-base-300 relative overflow-hidden">
{/* Animated background decorations */}
<div className="fixed inset-0 pointer-events-none overflow-hidden">
{/* Gradient orbs */}
<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl
animate-float"></div>
<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full
blur-3xl animate-float-delayed"></div>
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96
bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
{/* Grid pattern */}
<div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
</div>
{/* Navbar with blur backdrop */}
<div className="sticky top-0 z-50 backdrop-blur-md bg-base-100/80 border-b
border-base-content/10 shadow-lg">
<NavBar />
</div>
{/* Main content area with page transition */}
<main
className={`flex-1 relative z-10 transition-all duration-300 ${
pageTransition ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
}`}
>
<div className="container mx-auto px-4 py-6">
<Outlet />
</div>
</main>
{/* Footer with gradient border */}
<div className="relative z-10 mt-auto">
<div className="h-px bg-gradient-to-r from-transparent via-primary/50
to-transparent"></div>
<Footer />
</div>
{/* Scroll to top button */}
<ScrollToTop />
</div>
);
};
// Scroll to top component
const ScrollToTop = () => {
const [isVisible, setIsVisible] = useState(false);
useEffect(() => {
const toggleVisibility = () => {
if (window.pageYOffset > 300) {
setIsVisible(true);
} else {
setIsVisible(false);
}
};
window.addEventListener('scroll', toggleVisibility);
return () => window.removeEventListener('scroll', toggleVisibility);
}, []);
const scrollToTop = () => {
window.scrollTo({
top: 0,
behavior: 'smooth',
});
};
return (
<button
onClick={scrollToTop}
className={`fixed bottom-8 right-8 z-50 btn btn-circle btn-primary shadow-2xl transition-all
duration-300 ${
isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
} hover:scale-110 hover:shadow-primary/50`}
aria-label="Scroll to top"
>
<svg
xmlns="http://www.w3.org/2000/svg"
className="h-6 w-6"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
>
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7
7m-7-7v18" />
</svg>
</button>
);
};
export default Body;





































// import React from 'react'
// import { useLocation,Outlet, useNavigate } from "react-router-dom";
// import NavBar from './components/NavBar'
// import  {Base_URL}  from './utils/constants';
// import axios from 'axios'
// import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { addUser } from './utils/userSlice'
// import { useEffect } from 'react'
// import Footer from './components/Footer'

// const Body = () => {
//   const dispatch  = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const userData = useSelector((store) => store.user); // to access the user state from the redux store
//   //after reloading the page this function fetch logged in user data from the server
  
//   const fetchUser = async() =>{
//     if(userData) return;
//     try{
//       const res = await axios.get(Base_URL + "/profile/view" , {
//         withCredentials:true,
//       });
//       dispatch(addUser(res.data));
//     }catch(err){
//       if (err.response?.status === 401){
//         navigate("/login");
//       }
//       else{
//         console.log(err);
//       }
//     }
//   };
//   useEffect(()=>{
//      if (location.pathname === "/login") return;
//     fetchUser();
//   },[location.pathname]);


//   return (
//     <div>
//         <NavBar/>
//         <Outlet/>
//         <Footer/>
//     </div>
//   );
// };

// export default Body;