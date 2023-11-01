import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Properties from './pages/Properties';
import Trips from './pages/Trips';
import Reservations from './pages/Reservations';
import Home from './pages/Home';
import MainLayout from './components/layouts/MainLayout';
import countries from 'world-countries';
function App() {

  console.log('ddd', countries)
  return (
      <div className="">
        <MainLayout ><p></p></MainLayout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/properties' element={<Properties />} />
            <Route path='/trips' element={<Trips />} />
            <Route path='/reservations' element={<Reservations />} />
        </Routes>
      </div>
    
  );
}

export default App;
