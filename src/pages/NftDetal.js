import React, { useEffect, useState } from "react";
import {
    Image,
    Card,
    Avatar,
    Tooltip,
    Row,
    Col,
    Button,
    notification,
} from "antd";
import { SmileOutlined, MehOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import "./css/NftDetail.css";
import axios from "axios";
import {
    convertToEth,
    convertToDay,
    alchemy,
    convertIpfs,
    vendorAcceptOffer,
    cutStringErr,
} from "../function/Function";
import makeBlockie from "ethereum-blockies-base64";
import { AddressContext } from "../context/MyContext";
import ReceiptDetail from "./ReceiptDetail";
const { Meta } = Card;
const { ethereum } = window;

const NftDetail = () => {
    const location = useLocation();
    const { currentAddress, loginMetaMask } = React.useContext(AddressContext);
    const [isLoading, SetIsLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [receipt, setReceipt] = useState();
    const [offer, setOffer] = useState([]);
    const [nft, setNft] = useState();
    const [metaData, setMetaData] = useState();
    const [lendor, setlendor] = useState("");
    const [pay1Time, setPay1Time] = useState(0);
    const [payAllTime, setpayAllTime] = useState(0);
    const [selectOffer, setSelectOffer] = useState();
    const [api, contextHolder] = notification.useNotification();
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
    const getData = async () => {
        await axios({
            method: "get",
            url: `http://localhost:5000${location.pathname}`,
        }).then(
            async (response) => {
                setNft(response.data.nft);
                setOffer(response.data.offers);
                setReceipt(response.data.receipt);
                const data = await alchemy.nft.getNftMetadata(
                    response.data.nft.webAddress,
                    response.data.receipt.tokenId
                );
                setMetaData(data);
                if(response.data.receipt.tokenRate != "0" ) {
                    setlendor(response.data.receipt.lendor);

                    const offerAmount = response.data.receipt.tokenAmount;
                    const rate = response.data.receipt.tokenRate;
                    const numberOfPayment = response.data.receipt.paymentTime;
                    const interest = (offerAmount * rate) / 100 / numberOfPayment;
                    const payOneTime = offerAmount / numberOfPayment + interest;
                    setPay1Time(payOneTime);
                    setpayAllTime(payOneTime * numberOfPayment);
                }
            },
            (error) => {
                console.log("error", error);
            }
        );
        SetIsLoading(false);
    };
    useEffect(() => {
        if (isLoading) {
            console.log("load data-=-----------------");
            getData();
        }
    }, [isLoading]);
    const handleOnclick = (data, index) => {
        setlendor(data.lendor);
        setSelectOffer(data);
        const offerAmount = data.offerTokenAmount;
        const rate = data.offerTokenRate;
        const numberOfPayment = data.offerPayTime;
        const interest = (offerAmount * rate) / 100 / numberOfPayment;
        const payOneTime = offerAmount / numberOfPayment + interest;
        setPay1Time(payOneTime);
        setpayAllTime(payOneTime * numberOfPayment);
        const element = document.getElementsByClassName(
            "ant-btn css-dev-only-do-not-override-diro6f ant-btn-primary ant-btn-lg li_btn"
        );
        console.log("element", element);
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const a = element[key];
                a.classList.remove("selected");
            }
        }
        element[index].classList.add("selected");
    };
    const clearInfo = () => {
        setlendor("");
        setSelectOffer();
        setPay1Time(0);
        setpayAllTime(0);
        const element = document.getElementsByClassName(
            "ant-btn css-dev-only-do-not-override-diro6f ant-btn-primary ant-btn-lg li_btn"
        );
        console.log("element", element);
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const a = element[key];
                a.classList.remove("selected");
            }
        }
    };
    const onConfirm = async () => {
        if (selectOffer != null) {
            var addressData;
            if (!currentAddress) {
                const listAccount = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                addressData = listAccount[0];
                await loginMetaMask(addressData);
            }
            setLoading(true);
            try {
                const result = await vendorAcceptOffer(
                    selectOffer.receiptNumber,
                    selectOffer.offerNumber,
                    addressData || currentAddress
                );
                console.log("result", result);
                setTimeout(async () => {
                    openNotification("Tnx success", result.transactionHash);
                    setLoading(false);
                    setDisableSubmit(true);
                    SetIsLoading(true);

                    // await getData()
                }, 3000);
            } catch (error) {
                setTimeout(() => {
                    setLoading(false);
                    openNotification("Tnx fail", cutStringErr(error.message));
                }, 3000);
            }
        }
    };
    return (
        <div className="nft-detail">
            {contextHolder}

            <div className="nft-detail-info">
                <Image
                    width={200}
                    src={convertIpfs(metaData?.rawMetadata.image)}
                />
                <div className="nft-detail-script">
                    <p className="">Lendor: {lendor}</p>
                    <p className="">Pay 1 time: {convertToEth(pay1Time)} eth</p>
                    <p className="">
                        Pay all time: {convertToEth(payAllTime)} eth
                    </p>
                </div>
                {receipt?.tokenRate == "0" ? <div className="nft-detail-info-btn">
                    <Button style={{ width: "80px" }} onClick={clearInfo}>
                        Clear
                    </Button>
                    <Button
                        loading={loading}
                        disabled={disableSubmit}
                        type="primary"
                        style={{ minWidth: "80px" }}
                        onClick={onConfirm}
                    >
                        Choose
                    </Button>
                </div>: <></>}
                
            </div>
            <div className="nft-detail-offer">
                {receipt?.tokenRate === 0 ? (
                    <ul>
                        {offer?.map((data, index) => (
                            <li className="nft-detail-li" key={data._id}>
                                <Card
                                    className="nft-detail-offer-card"
                                    hoverable
                                >
                                    <Tooltip title={data.lendor}>
                                        <Meta
                                            avatar={
                                                <Avatar
                                                    size={45}
                                                    src={makeBlockie(
                                                        data.lendor
                                                    )}
                                                />
                                            }
                                        />
                                    </Tooltip>
                                    <Row className="nft-detail-offer-description">
                                        <Col>
                                            {" "}
                                            ETH:{" "}
                                            {convertToEth(
                                                data.offerTokenAmount
                                            )}{" "}
                                        </Col>
                                        <Col> Rate: {data.offerTokenRate} </Col>
                                        <Col>
                                            {" "}
                                            Days:{" "}
                                            {convertToDay(
                                                data.offerAmountOfTime
                                            )}
                                        </Col>
                                        <Col>Pay Time: {data.offerPayTime}</Col>
                                    </Row>
                                    <Button
                                        size="large"
                                        type="primary"
                                        className="li_btn"
                                        onClick={() => {
                                            handleOnclick(data, index);
                                        }}
                                    >
                                        Detail
                                    </Button>
                                </Card>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ReceiptDetail data={{receipt, pay1Time, payAllTime, SetIsLoading}}/>
                )}
            </div>
        </div>
    );
};

export default NftDetail;
