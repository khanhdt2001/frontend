import React from "react";
import Routers from "../../routers/Routers";
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import { Layout } from "antd";
import Provider from "../../context/MyContext"



const MyLayout = () => {
   return (
      <Provider>
         <Header />
         <Layout>
            <SideBar />
            <Routers />
         </Layout>
      </Provider>
   );
};

export default MyLayout;
