import React from 'react';
import './App.css';
import Main from './Components/Routes/Main';
import Navbar from './Components/Navigation/Navbar';
import Sidebar from './Components/Navigation/Sidebar';
import FlashMessagesList from './Components/flash/FlashMessagesList';

const App = () => (
    <div>
        <Navbar/>
        <div className="container-fluid">
            <FlashMessagesList/>
            <Main/>
        </div>
    </div>
)

export default App;
