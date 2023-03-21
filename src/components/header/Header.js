import React, { useState } from "react";
import "./Header.css";
import { Row, Col, Drawer } from "antd";
import { WalletOutlined, FireOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AddressContext } from "../../context/MyContext";
import { myShortString } from "../../function/Function";
import axios from "axios";
import Web3 from "web3";
import Web3Token from "web3-token";
import MyDrawer from "../drawer/MyDrawer";
const { ethereum } = window;
const web3 = new Web3(Web3.givenProvider);
const Header = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const { currentAddress, loginMetaMask } = React.useContext(AddressContext);
    const connectWallet = async () => {
        if (!currentAddress) {
            const listAccount = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const addressData = listAccount[0];
            await loginMetaMask(addressData);
        } else {
            showDrawer();
        }
    };
    return (
        <Row className="my-header-row">
            <Col span={3}>
                <Row justify={"center"} className="my-header-logo">
                    <FireOutlined style={{ fontSize: "30px" }} />
                    Ezio
                </Row>
            </Col>
            <Col span={3} offset={18}>
                <Row justify={"center"}>
                    <Button
                        type={currentAddress === "" ? "default" : "primary"}
                        icon={<WalletOutlined style={{ fontSize: "20px" }} />}
                        onClick={connectWallet}
                        className="login-btn"
                    >
                        {myShortString(currentAddress, 10) || "Connnect wallet"}
                    </Button>
                </Row>
            </Col>
            <Drawer
                title="Balance"
                placement="right"
                onClose={onClose}
                open={open}
                width="400px"
            >
                <MyDrawer />
            </Drawer>
        </Row>
    );
};

export default Header;
