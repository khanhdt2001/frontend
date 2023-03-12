import React, { useState, useEffect } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { Avatar, Card, Button, Row, Col } from "antd";
import { DollarCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";

import MyModalMakeRequest from "../components/Modal/MyModalMakeRequest";
import {alchemy} from "../function/Function"
import "./css/Market.css";

const { Meta } = Card;

const Market = () => {
    const [NFTInfo, SetNFTInfo] = useState([]);
    const [isLoading, SetIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [currentNftAddress, setCurrentNftAddress] = useState("");
    // const [currentLocalAddress, setCurrentLocalAddress] = useState("");
    const showModal = (address) => {
        setIsModalOpen(true);
        setCurrentNftAddress(address);
        // setCurrentLocalAddress(localAddress);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModalLoading(false);
    };
    useEffect(() => {
        const GetNftLocal = async () => {
            await axios.get("http://localhost:5000/nfts").then(
                async (response) => {
                    console.log(response);
                    const dataLocal = response.data.nfts;
                    const data =
                        (await Promise.all(
                            dataLocal.map((nft) =>
                                alchemy.nft.getContractMetadata(nft.webAddress)
                            )
                        )) || [];
                    // for (let i = 0; i < data.length; i++) {
                    //     data[i].localAddress = dataLocal[i].localAddress
                    // }
                    SetNFTInfo(data);
                    SetIsLoading(false);
                },
                (error) => {
                    console.log(error);
                }
            );
        };
        if (isLoading) {
            GetNftLocal();
            
        }
    }, [isLoading]);
    return (
        <ul className="market__list ">
            {NFTInfo?.map((nftData) => (
                <li className="market__item" key={nftData?.address}>
                    <Card className="market_li_card" hoverable>
                        <Meta
                            avatar={
                                <Avatar
                                    size={64}
                                    src={nftData?.openSea.imageUrl}
                                />
                            }
                        />
                        <Row className="market_li_description">
                            <Row>
                                <p
                                    style={{
                                        display: "inline-flex",
                                        height: 0,
                                        lineHeight: 0,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {nftData?.name}
                                    <CheckCircleOutlined
                                        style={{
                                            fontSize: "14px",
                                            color: "#00a186",
                                        }}
                                    />
                                </p>
                            </Row>
                            <Row className="market_description_content">
                                <Col>fool price</Col>
                                <Col>
                                    <p style={{ display: "inline" }}>
                                        NFT in collection:{" "}
                                    </p>
                                    {nftData?.totalSupply}
                                </Col>
                                <Col>in market</Col>
                            </Row>
                        </Row>

                        <Button
                            size="large"
                            type="primary"
                            className="market_li_btn"
                            onClick={() => {
                                showModal(nftData?.address);
                            }}
                        >
                            <DollarCircleOutlined />
                            Borrow
                        </Button>
                    </Card>
                </li>
            ))}
            <MyModalMakeRequest
                data={{
                    isModalOpen,
                    setIsModalOpen,
                    handleCancel,
                    currentNftAddress,
                }}
            ></MyModalMakeRequest>
        </ul>
    );
};

export default Market;
