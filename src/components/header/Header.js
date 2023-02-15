import React from "react";
import "./Header.css";

import { Row, Col } from "antd";

import {
    UserOutlined,
    WalletOutlined,
    FireOutlined,
} from "@ant-design/icons";

const Header = () => {
    return (
        <Row className="my-header-row">
            <Col span={3} style={{backgroundColor:"red"}}>
                <Row justify={"center"} className="my-header-logo">
                    <FireOutlined style={{ fontSize: "30px" }} />
                    Ezio
                </Row>
            </Col>
            <Col span={3} offset={18} >
                <Row justify={"center"}>
                    <UserOutlined
                        className="my-header-icon"
                        style={{ fontSize: "20px" }}
                    />
                    <WalletOutlined
                        className="my-header-icon"
                        style={{ fontSize: "20px" }}
                    />
                </Row>
            </Col>
        </Row>
    );
};

export default Header;
