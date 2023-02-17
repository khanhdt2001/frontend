import React from "react";
import "./Header.css";
import { Row, Col } from "antd";
import { WalletOutlined, FireOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Web3 from "web3";
import Web3Token from "web3-token";
import { AddressContext } from "../../context/MyContext";
import { myShortString } from "../../function/Function";

const { ethereum } = window;

const Header = () => {
    const web3 = new Web3(Web3.givenProvider);
    const { currentAddress, loginMetaMask } = React.useContext(AddressContext);
    const connectWallet = async () => {
        if (!currentAddress) {
            const listAccount = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const addressData = listAccount[0];
            await loginMetaMask(addressData);
            const token = await Web3Token.sign(
                (msg) => web3.eth.personal.sign(msg, addressData),
                "1d"
            );
            localStorage.setItem("web3-token", token);
        }
    };
    return (
        <Row
            className="my-header-row"
            style={{
                background:
                    "linear-gradient(-45deg, #e250e5, #4b50e6, #e250e5, #4b50e6)",
            }}
        >
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
                    >
                        {myShortString(currentAddress, 10) || "Connnect wallet"}
                    </Button>
                </Row>
            </Col>
        </Row>
    );
};

export default Header;
