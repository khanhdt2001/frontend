import React, { useState, useEffect } from "react";
import {
    Image,
    Card,
    Avatar,
    Tooltip,
    Row,
    Col,
    Button,
    notification,
    Steps,
    theme,
    Result,
} from "antd";
import checked from "../assets/picture/check.png";
import check from "../assets/picture/checked.png";
import { SmileOutlined, MehOutlined } from "@ant-design/icons";
import ethPng from "../assets/picture/ethereum.png";

import { AddressContext } from "../context/MyContext";
import {
    alchemy,
    convertIpfs,
    convertToEth,
    convertToDay,
    checkAbleToWithDrawNft,
    withdrawNft,
    cutStringErr,
} from "../function/Function";
import axios from "axios";
import "./css/MyOffer.css";
const { Meta } = Card;
const { ethereum } = window;
const { Step } = Steps;
const MyOffer = () => {
    const { currentAddress, loginMetaMask } = React.useContext(AddressContext);
    const [isLoading, SetIsLoading] = useState(true);
    const [metadata, setMetadata] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [chooseNumber, setChoose] = useState(0);
    const [receiptCurrent, setReceipt] = useState();
    const [ableToWithDraw, setAbleToWithDraw] = useState(false);
    const stepss = [];
    const [stepsData, setStepsData] = useState([]);
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(false);
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
    const onChange = (value) => {
        // console.log('onChange:', value);
        setCurrent(value);
    };
    const onWithDrawNft = async () => {
        try {
            const res = await withdrawNft(
                receiptCurrent.receiptNumber,
                currentAddress
            );
            setTimeout(async () => {
                openNotification("Tnx success", res.transactionHash);
                setLoading(true);
            }, 3000);
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                openNotification("Tnx fail", cutStringErr(error.message));
            }, 3000);
        }
    };
    const setUpData = async (index) => {
        const receipt = data.receipts[index]?.receipt;
        setAbleToWithDraw(false);

        setReceipt(receipt);
        console.log("receipt", receipt);
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
                content = `Vendor pay  eth before ` + title + detail;
            }
            const day = {
                title: title,
                content: content,
                description: content,
            };
            stepss.push(day);
        }
        setStepsData(stepss);
        const able = await checkAbleToWithDrawNft(
            receipt?.receiptNumber,
            currentAddress
        );
        if (able) {
            setAbleToWithDraw(true);
        }
    };
    const hanldeOnClick = (index) => {
        setChoose(index);
        // clear checked
        const element = document.getElementsByClassName(
            // "ant-btn css-dev-only-do-not-override-diro6f ant-btn-primary ant-btn-lg li_btn"
            "ant-btn css-dev-only-do-not-override-13f3vj5 ant-btn-primary ant-btn-lg li_btn"
        );
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const a = element[key];
                a.classList.remove("selected");
            }
        }
        // get new checked
        const card = document.getElementsByClassName("ant-card-body");
        card[index].lastChild.classList.add("selected");
        setUpData(index);
    };
    useEffect(() => {
        const getOffers = async () => {
            var addressData;
            if (!currentAddress) {
                const listAccount = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                addressData = listAccount[0];
                await loginMetaMask(addressData);
            }
            await axios({
                method: "get",
                url: `http://localhost:5000/offer/8/${page}/${
                    currentAddress || addressData
                }`,
            }).then(
                async (response) => {
                    setData(response.data);
                    setTotal(response.data.total);

                    const result = await Promise.all(
                        response.data.receipts.map((item) =>
                            alchemy.nft.getNftMetadata(
                                item.receipt.NFTAddress,
                                item.receipt.tokenId
                            )
                        )
                    );
                    setMetadata(result);
                    SetIsLoading(false);
                },
                (error) => {
                    console.log(error);
                }
            );
        };
        if (isLoading) {
            getOffers();
        }
    }, [isLoading]);
    const cleanInfor = () => {
        setChoose(0);
        // clear checked
        const element = document.getElementsByClassName(
            // "ant-btn css-dev-only-do-not-override-1ttravq ant-btn-primary ant-btn-lg li_btn"
            "ant-btn css-dev-only-do-not-override-13f3vj5 ant-btn-primary ant-btn-lg li_btn"
        );
        console.log(element);
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const a = element[key];
                a.classList.remove("selected");
            }
        }

        setUpData([]);
        setAbleToWithDraw(false);
    };
    return (
        <div className="offers_container">
            {contextHolder}
            {data?.offers?.length === 0 ? (
                <Result
                    className="my_result_404"
                    status="404"
                    subTitle="Sorry, there are no offers at the moment."
                />
            ) : (
                <div className="offers_container_info">
                    <Steps
                        current={current}
                        direction="vertical"
                        size="small"
                        onChange={onChange}
                        className="offers_container_step"
                    >
                        {stepsData?.map((item, index) => (
                            <Step
                                key={index}
                                title={item.title}
                                description={item.description}
                            ></Step>
                        ))}
                    </Steps>
                    <Button className="my_offer_close_btn" onClick={cleanInfor}>
                        X
                    </Button>
                    {ableToWithDraw === true &&
                    receiptCurrent?.out === false ? (
                        <Button
                            type="primary"
                            className="my_offer_withdraw_btn"
                            onClick={onWithDrawNft}
                            loading={loading}
                        >
                            Withdraw
                        </Button>
                    ) : (
                        <></>
                    )}
                </div>
            )}

            <div className="nft-detail-offer">
                <ul>
                    {data?.offers?.map((dataC, index) => (
                        <li className="nft-detail-li" key={dataC._id}>
                            <Card className="nft-detail-offer-card" hoverable>
                                <Tooltip title="">
                                    <Meta
                                        avatar={
                                            <Avatar
                                                size={45}
                                                src={convertIpfs(
                                                    metadata[index]?.rawMetadata
                                                        .image
                                                )}
                                            />
                                        }
                                    />
                                </Tooltip>
                                <Row className="nft-detail-offer-description">
                                    <Col className="eth_container">
                                        {" "}
                                        ETH:{" "}
                                        {convertToEth(dataC.offerTokenAmount)}
                                        <img className="eth_img" src={ethPng} />
                                    </Col>
                                    <Col> Rate: {dataC.offerTokenRate}</Col>
                                    <Col>
                                        {" "}
                                        Days:{" "}
                                        {convertToDay(dataC.offerAmountOfTime)}
                                    </Col>
                                    <Col>Pay Time: {dataC.offerPayTime} </Col>
                                </Row>
                                {dataC?.checked == true ? (
                                    <Meta
                                        className="offers_container_checked"
                                        avatar={
                                            <Avatar size={24} src={checked} />
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                                {data?.receipts[index].receipt.out === true ? (
                                    <Meta
                                        className="offers_container_checked"
                                        avatar={
                                            <Avatar size={24} src={check} />
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                                {dataC.checked === true ? (
                                    <Button
                                        size="large"
                                        type="primary"
                                        className="li_btn"
                                        onClick={() => {
                                            hanldeOnClick(index);
                                        }}
                                    >
                                        Detail
                                    </Button>
                                ) : (
                                    <></>
                                )}
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyOffer;
