import React, { useState } from "react";
import "./Header.css";
import { Row, Col, Drawer } from "antd";
import { FireOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AddressContext } from "../../context/MyContext";
import { myShortString } from "../../function/Function";
import axios from "axios";
import Web3 from "web3";
import Web3Token from "web3-token";
import MyDrawer from "../drawer/MyDrawer";
import walletIcon from "../../assets/picture/wallet.png";
import { useNavigate } from "react-router-dom";
const { ethereum } = window;
const web3 = new Web3(Web3.givenProvider);
const Header = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
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
    const goHome = () => {
        console.log("click go home");
        navigate(`/home`);
    }
    return (
        <Row className="my-header-row">
            <Col span={3} className="my_header_logo">
                <Row justify={"center"} className="my-header-logo" onClick={goHome}>
                    <FireOutlined style={{ fontSize: "30px" }} />
                    Ezio
                </Row>
            </Col>
            <Col span={3} offset={18}>
                <Row justify={"center"}>
                    <Button
                        type={currentAddress === "" ? "default" : "primary"}
                        onClick={connectWallet}
                        className="login-btn"
                    >
                        {currentAddress === "" ? (
                            <></>
                        ) : (
                            <img className="wallet_icon" src={walletIcon} />
                        )}

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
                <MyDrawer data={{ open }} />
            </Drawer>
        </Row>
    );
};

export default Header;
