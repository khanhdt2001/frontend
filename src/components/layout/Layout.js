import React from "react";
import Routers from "../../routers/Routers";
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import { Layout } from "antd";

const MyLayout = () => {
   return (
      <>
         <Header />
         <Layout>
            <SideBar />
            <Routers />
         </Layout>
      </>
   );
};

export default MyLayout;
