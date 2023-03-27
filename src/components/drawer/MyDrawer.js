import React, { useState } from "react";
import "./MyDrawer.css";
import { Button, Input, Statistic, Space, message } from "antd";
import CountUp from "react-countup";
import ethPng from "../../assets/picture/ethereum.png";
import {
    getAddressBalance,
    convertToEth,
    withdrawEth,
    convertoWei,
    depositEth,
} from "../../function/Function";
import { AddressContext } from "../../context/MyContext";
import MyChat from "../chat/MyChat";
const formatter = (value) => <CountUp end={value} separator="," />;

const MyDrawer = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [balance, setbalance] = useState();
    const [disbtn, setDisbtn] = useState(false);
    const [eth, setEth] = useState();
    const [deposit, setDeposit] = useState();
    const { currentAddress } = React.useContext(AddressContext);

    const { open } = props.data;
    const getBalance = async () => {
        const result = await getAddressBalance(currentAddress);
        setbalance(convertToEth(result));
    };
    const withdraw = async (value) => {
        const target = convertoWei(value);
        console.log("target", target);
        await withdrawEth(target, currentAddress);
        await getBalance();
    };
    const depositToken = async (value) => {
        const target = convertoWei(value)
        await depositEth(target, currentAddress);
        await getBalance();
    }
    if (open) {
        getBalance().then();
    }
    const onChange = (e) => {
        setEth(e.target.value);
    };
    const onChangeDeposit = (e) => {
        setDeposit(e.target.value);
    };
    const onWithdraw = async () => {
        if (eth > 0) {
            setDisbtn(true);
            await withdraw(eth);
            setTimeout(() => {
                success(`You have received ${eth} eth to your address`);
                setEth();
                setDisbtn(false);
            }, 2000);
        }
    };

    const onDeposit = async () => {
        console.log("onDeposit");
        if (deposit > 0) {
            setDisbtn(true);
            await depositToken(deposit)
            setTimeout(() => {
                success(`You have deposit ${deposit} eth to contract`);
                setDeposit();
                setDisbtn(false);
            }, 2000);
        }
    };
    const success = (content) => {
        messageApi.open({
            type: "success",
            content: content,
            className: "custom_class",
            duration: 3,
        });
    };
    return (
        <div className="my_drawer">
            {contextHolder}
            <div className="my_drawer_balance">
                <Statistic
                    title="My balance"
                    value={balance}
                    formatter={formatter}
                />
                <img className="my_drawer_balance_icon" src={ethPng} />
            </div>

            <div className="my_drawer_input">
                <Space.Compact
                    style={{
                        width: "100%",
                    }}
                >
                    <Input
                        value={eth}
                        onChange={onChange}
                        placeholder="Amount of eth want to withdraw"
                    />
                    <Button
                        disabled={disbtn}
                        onClick={onWithdraw}
                        type="primary"
                    >
                        Widthdraw
                    </Button>
                </Space.Compact>
                <Space.Compact
                    className="deposit_my_drawer_input"
                    style={{
                        width: "100%",
                    }}
                >
                    <Input
                        value={deposit}
                        onChange={onChangeDeposit}
                        placeholder="Amount of eth want to deposit"
                    />
                    <Button
                        disabled={disbtn}
                        onClick={onDeposit}
                        type="default"
                    >
                        Deposit
                    </Button>
                </Space.Compact>
            </div>
            <div className="drawer_msg">
                <MyChat/>
            </div>
        </div>
    );
};

export default MyDrawer;
