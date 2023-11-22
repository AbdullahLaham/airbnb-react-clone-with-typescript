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
import ListingDetails from './pages/ListingDetails';
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
            <Route path='/listings/:id' element={<ListingDetails />} />
        </Routes>

        
      </div>
    
  );
}

export default App;

{/* <Routes>
        <Route path='/' element={authData ? <Navigate to='home' /> : <Navigate to='auth' />} />
        <Route path='/home' element={authData ? <HomePage /> : <Navigate to='../auth' />} />

        <Route path='/profile/:id' element={authData ? <ProfilePage /> : <Navigate to='../auth' />} />
        <Route path='/auth' element={authData ? <Navigate to='../home' /> : <AuthPage />} />
        <Route path='/chat' element={authData ? <Chat  /> : <Navigate to='../auth' />} />
</Routes> */}