import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Center, Loader } from "@mantine/core";

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Suspense
          fallback={
            <Center h={600}>
              <Loader color="blue" size={100} />
            </Center>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MainLayout;
