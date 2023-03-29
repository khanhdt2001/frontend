import React from "react";
import "./SideBar.css";
import {
    ShopOutlined,
    PieChartOutlined,
    SolutionOutlined,
    PaperClipOutlined,
    DashboardOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AddressContext } from "../../context/MyContext";
import { useLocation } from 'react-router-dom';
const { Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem(
        <NavLink to={"/home"} style={{ fontSize: "16px", color:"white", fontFamily: 'Poppins' }}>
            Home
        </NavLink>,
        "/home",
        <ShopOutlined style={{ fontSize: "20px" }} />
    ),
    getItem(
        <NavLink to={"/requests"} style={{ fontSize: "16px", color:"white" }}>
            Request
        </NavLink>,
        "/requests",
        <DashboardOutlined style={{ fontSize: "20px" }} />
    ),
    getItem(
        <NavLink  style={{ fontSize: "16px", color:"white" }}>
            My Profile
        </NavLink>,
        "3",
        <SolutionOutlined style={{ fontSize: "20px" }} />,
        [
            getItem(
                <NavLink to={"/my-request"} style={{ fontSize: "16px", color:"white" }}>
                    My Request
                </NavLink>,
                "/my-request",
                <PaperClipOutlined style={{ fontSize: "20px" }} />
            ),
            getItem(
               <NavLink to={"/my-offer"} style={{ fontSize: "16px", color:"white" }}>
                   My Offer
               </NavLink>,
               "/my-offer",
               <PieChartOutlined style={{ fontSize: "20px" }} />
           ),
        ]
    ),
];
const unConnectItem = [
    getItem(
        <NavLink to={"/home"} style={{ fontSize: "16px", color:"white" }}>
            Home
        </NavLink>,
        "/home",
        <ShopOutlined style={{ fontSize: "20px" }} />
    ),
    getItem(
        <NavLink to={"/requests"} style={{ fontSize: "16px", color:"white" }}>
            Request
        </NavLink>,
        "/requests",
        <DashboardOutlined style={{ fontSize: "20px" }} />
    ),
]

const SideBar = () => {
    const { currentAddress } = React.useContext(AddressContext);
    const [collapsed, setCollapsed] = useState(false);
    const { pathname } = useLocation();
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className="my-side-bar"
            width={220}
        >
            <Menu
                theme="dark"
                defaultSelectedKeys={pathname}
                mode="inline"
                items={currentAddress !== "" ? items : unConnectItem}
            ></Menu>
        </Sider>
    );
};

export default SideBar;
