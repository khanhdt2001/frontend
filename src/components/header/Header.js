import React from "react";
import "./Header.css";
import { Row, Col } from "antd";
import { WalletOutlined, FireOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AddressContext } from "../../context/MyContext";
import { myShortString } from "../../function/Function";
import axios from "axios";
import Web3 from "web3";
import Web3Token from "web3-token";
const { ethereum } = window;
const web3 = new Web3(Web3.givenProvider);
const Header = () => {
    const { currentAddress, loginMetaMask } = React.useContext(AddressContext);
    const connectWallet = async () => {
        if (!currentAddress) {
            const listAccount = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const addressData = listAccount[0];
            await loginMetaMask(addressData);
            // const token = await Web3Token.sign(
            //     (msg) => web3.eth.personal.sign(msg, addressData),
            //     "1d"
            // );
            // await axios
            //     .post("http://192.168.1.59:5000/connect-wallet", {
            //         web3Token : token,
            //     })
            //     .then(
            //         (response) => {
            //             localStorage.setItem("my-token", response.data.jwt);
            //         },
            //         (error) => {
            //             console.log(error);
            //         }
            //     );
            
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
                        className="login-btn"
                    >
                        {myShortString(currentAddress, 10) || "Connnect wallet"}
                    </Button>
                </Row>
            </Col>
        </Row>
    );
};

export default Header;
