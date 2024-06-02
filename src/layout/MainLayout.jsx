import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MainLayout;
