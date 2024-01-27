import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';


const AuthLayout = () => {
  return (
    <div className="wrapper">
    <Header />
    <div className="content">
      <Outlet />
    </div>
  </div>
  )
}

export default AuthLayout
