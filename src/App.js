import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Components/Main';
import Login from './Components/Login';
import Register from './Components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>} />
        <Route path="/Main" element={<Main/>} />
      </Routes>
    </Router>
  );
}

export default App;