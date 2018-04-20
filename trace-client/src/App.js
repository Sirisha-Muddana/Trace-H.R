import React from 'react';
import './App.css';
import Main from './Components/Main';
import Navbar from './Components/Navbar';

const App = () => (
  <div>
    <Navbar />
      <div className="container">
    <Main />
      </div>
  </div>
)

export default App;
