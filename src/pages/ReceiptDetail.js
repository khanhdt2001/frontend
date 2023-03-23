import React from "react";
import { Button, Steps, notification } from "antd";
import { SmileOutlined, MehOutlined } from "@ant-design/icons";

import {
    convertToEth,
    vendorPayRountine,
    cutStringErr,
    withdrawNft,
} from "../function/Function";

import { useState } from "react";
import "./css/ReceiptDetail.css";
import { AddressContext } from "../context/MyContext";

const { ethereum } = window;

const ReceiptDetail = (props) => {
    const { receipt, pay1Time, payAllTime, SetIsLoading } = props.data;
    const { currentAddress, loginMetaMask } = React.useContext(AddressContext);
    const [current, setCurrent] = useState(0);
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);

    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const stepss = [];
    const setUpData = () => {
        for (let i = receipt?.paymentTime; i >= 0; i--) {
            const second =
                receipt?.deadLine -
                (i * receipt?.amountOfTime) / receipt?.paymentTime;
            const date = new Date(second * 1000);
            const title = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`;
            let content = "";
            const detail = `, ${date.getHours()}h, ${date.getMinutes()} min, ${date.getSeconds()} secs`;
            if (i === receipt?.paymentTime) {
                content = "Start receipt at " + title + detail;
            } else {
                content =
                    `Pay ${convertToEth(pay1Time)} eth before ` +
                    title +
                    detail;
            }
            const day = {
                title: title,
                content: content,
            };
            stepss.push(day);
        }
    };
    setUpData();
    const items = stepss.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const openNotification = (msg, des) => {
        api.open({
            message: msg,
            description: des,
            duration: 0,
            icon:
                msg === "Tnx success" ? (
                    <SmileOutlined
                        style={{
                            color: "#108ee9",
                        }}
                    />
                ) : (
                    <MehOutlined
                        style={{
                            color: "red",
                        }}
                    />
                ),
        });
    };
    const onConfirm = async () => {
        var addressData;
        if (!currentAddress) {
            const listAccount = await ethereum.request({
                method: "eth_requestAccounts",
            });
            addressData = listAccount[0];
            await loginMetaMask(addressData);
        }
        setLoading(true);
        console.log("receipt.paymentCount - 1 === receipt.paymentTime", receipt.paymentCount - 1 , receipt.paymentTime);

        try {
            const result = await vendorPayRountine(
                receipt.receiptNumber,
                pay1Time.toString(),
                addressData || currentAddress
            );
            setTimeout(async () => {
                openNotification("Tnx success", result.transactionHash);
                setLoading(false);
                SetIsLoading(true);
            }, 3000);
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                setLoading(false);
                openNotification("Tnx fail", cutStringErr(error.message));
            }, 3000);
        }
        if (receipt.paymentTime - 1 === receipt.paymentCount) {
            try {
                const result = await withdrawNft(
                    receipt.receiptNumber,
                    addressData || currentAddress
                );
                setTimeout(async () => {
                    openNotification("Tnx success", result.transactionHash);
                    setLoading(false);
                }, 3000);
            } catch (error) {
                console.log(error);
                setTimeout(() => {
                    setLoading(false);
                    openNotification("Tnx fail", cutStringErr(error.message));
                }, 3000);
            }
        }
    };
    return (
        <div className="receipt_detail">
            {contextHolder}
            <Steps current={current} items={items} />
            <div className="receipt_detail_step_content">
                {stepss[current]?.content}
            </div>
            <div className="receipt_detail_btn">
                <div>
                    {current < stepss.length - 1 &&
                    current - 1 < receipt.paymentCount ? (
                        <Button
                            type="primary"
                            style={{
                                margin: "0 8px 0 0",
                            }}
                            onClick={() => next()}
                        >
                            Next
                        </Button>
                    ) : (
                        <></>
                    )}
                    {current > 0 && (
                        <Button onClick={() => prev()}>Previous</Button>
                    )}
                </div>
                <div className="receipt_detail_btn_right">
                    {current > 0 && current - 1 === receipt.paymentCount ? (
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={onConfirm}
                        >
                            Submit
                        </Button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReceiptDetail;
