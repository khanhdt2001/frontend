import React, { useState } from "react";
import "./MyDrawer.css";
import { Button, Input, Statistic, Space } from "antd";
import CountUp from "react-countup";
import ethPng from "../../assets/picture/ethereum.png";
import { getAddressBalance, convertToEth } from "../../function/Function";
import { AddressContext } from "../../context/MyContext";

const formatter = (value) => <CountUp end={value} separator="," />;
const { Search } = Input;
const MyDrawer = (props) => {
    const [balance, setbalance] = useState();
    const [eth, setEth] = useState();
    const { currentAddress } = React.useContext(AddressContext);

    const { open } = props.data;
    const getBalance = async () => {
        const result = await getAddressBalance(currentAddress);

        setbalance(convertToEth(result));
    };
    if (open) {
        getBalance().then();
    }
    const onChange = (e) => {
      setEth(e.target.value)
    }
    return (
        <div className="my_drawer">
            <div className="my_drawer_balance">
                <Statistic
                    title="My balance"
                    value={(balance)}
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
                    <Input onChange={onChange}  placeholder="Amount of eth want to withdraw" />
                    <Button type="primary">Widthdraw</Button>
                </Space.Compact>
            </div>
        </div>
    );
};

export default MyDrawer;
