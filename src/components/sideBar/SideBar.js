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
        <NavLink to={"/home"} style={{ fontSize: "16px", color:"white" }}>
            Home
        </NavLink>,
        "1",
        <ShopOutlined style={{ fontSize: "20px" }} />
    ),
    getItem(
        <NavLink to={"/requests"} style={{ fontSize: "16px", color:"white" }}>
            Request
        </NavLink>,
        "2",
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
                "4",
                <PaperClipOutlined style={{ fontSize: "20px" }} />
            ),
            getItem(
               <NavLink to={"/vendor-profile"} style={{ fontSize: "16px", color:"white" }}>
                   My Offer
               </NavLink>,
               "5",
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
        "1",
        <ShopOutlined style={{ fontSize: "20px" }} />
    ),
    getItem(
        <NavLink to={"/requests"} style={{ fontSize: "16px", color:"white" }}>
            Request
        </NavLink>,
        "2",
        <DashboardOutlined style={{ fontSize: "20px" }} />
    ),
]

const SideBar = () => {
    const { currentAddress } = React.useContext(AddressContext);
    const [collapsed, setCollapsed] = useState(false);
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
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={currentAddress !== "" ? items : unConnectItem}
            ></Menu>
        </Sider>
    );
};

export default SideBar;
