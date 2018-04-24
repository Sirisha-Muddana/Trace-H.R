import React from 'react';
import './App.css';
import Main from './Components/Routes/Main';
import Navbar from './Components/Navigation/Navbar';
import Sidebar from './Components/Navigation/Sidebar';
import FlashMessagesList from './Components/flash/FlashMessagesList'
const App = () => (
  <div>
    <Navbar />
      <div className="container-fluid">
          <div className="row">
              <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
                  <Sidebar />
              </nav>
              <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                  <FlashMessagesList />
                  <Main />
              </main>
          </div>
      </div>
  </div>
)

export default App;
