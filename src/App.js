import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkAuth } from './features/user';

import './App.css';
import './index.css';
import { Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
function App() {
  

	const dispatch = useDispatch();


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />

      </Routes>
  </Router>
  );
}

export default App;
