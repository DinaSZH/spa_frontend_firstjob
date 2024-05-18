import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


const MainLayout = () => {
  return (
    <div className="wrapper">
    <Header />
    <div className="content">
      <Outlet />
    </div>
  </div>
  )
}

export default MainLayout
