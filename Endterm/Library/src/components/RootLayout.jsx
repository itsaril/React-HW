import React from 'react';
import { Outlet } from 'react-router-dom'; 
import NavBar from './NavBar';
import OfflineBanner from './OfflineBanner';
import '../styles/App.css';

function RootLayout() {
  return (
    <div className="root-layout">
      <OfflineBanner />
      <NavBar />
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        © 2025 Library App
      </footer>
    </div>
  );
}

export default RootLayout;