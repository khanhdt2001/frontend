import React, { useEffect, useState } from "react";
import { Image, Card, Avatar, Tooltip, Row, Col, Button } from "antd";
import { useLocation } from "react-router-dom";
import "./css/NftDetail.css";
import axios from "axios";
import {
    convertToEth,
    myShortString,
    convertToDay,
    alchemy,
    convertIpfs,
} from "../function/Function";
import makeBlockie from "ethereum-blockies-base64";

const { Meta } = Card;

const NftDetail = () => {
    const location = useLocation();
    const [isLoading, SetIsLoading] = useState(true);
    const [receipt, setReceipt] = useState();
    const [offer, setOffer] = useState([]);
    const [nft, setNft] = useState();
    const [metaData, setMetaData] = useState();
    const [lendor, setlendor] = useState("");
    const [pay1Time, setPay1Time] = useState(0);
    const [payAllTime, setpayAllTime] = useState(0);
    const getData = async () => {
        await axios({
            method: "get",
            url: `http://localhost:5000${location.pathname}`,
        }).then(
            async (response) => {
                console.log("response", response);
                setNft(response.data.nft);
                setOffer(response.data.offers);
                setReceipt(response.data.receipt);
                const data = await alchemy.nft.getNftMetadata(
                    response.data.nft.webAddress,
                    response.data.receipt.tokenId
                );
                setMetaData(data);
            },
            (error) => {
                console.log("error", error);
            }
        );
        SetIsLoading(false);
    };
    useEffect(() => {
        if (isLoading) {
            getData();
        }
    }, [isLoading]);
    const handleOnclick = (data, index) => {
        setlendor(data.lendor);
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
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                const a = element[key];
                a.classList.remove("selected")
            }
        }
        element[index].classList.add("selected")
    };
    return (
        <div className="nft-detail">
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
            </div>
            <div className="nft-detail-offer">
                <ul>
                    {offer?.map((data, index) => (
                        <li className="nft-detail-li" key={data._id}>
                            <Card className="nft-detail-offer-card" hoverable>
                                <Tooltip title={data.lendor}>
                                    <Meta
                                        avatar={
                                            <Avatar
                                                size={45}
                                                src={makeBlockie(data.lendor)}
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
                                        {convertToDay(data.offerAmountOfTime)}
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
            </div>
        </div>
    );
};

export default NftDetail;
