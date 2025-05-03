// import logo from './logo.svg';
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from './pages/Home';
// function App() {
//   return (
//     <div className="App">
//      <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home/>}/>
//           </Routes>
//           </BrowserRouter>
//     </div>
//   );
// }


// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import PostCard from "./pages/PostCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<PostCard/>} />
        

      </Routes>
    </Router>
  );
}

export default App;