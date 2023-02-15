import React from "react";
import Routers from "../../routers/Routers";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SideBar from "../sideBar/SideBar";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Content } = Layout;

const MyLayout = () => {
    return (
        <>
            <Header />
            <Layout
                
            >
                <SideBar>
                    <Routers />
                </SideBar>
            </Layout>

        </>
    );
};

export default MyLayout;
