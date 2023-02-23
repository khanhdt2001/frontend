import React, { useState, useEffect } from "react";
import { Network, Alchemy } from "alchemy-sdk";
import { Avatar, Card,Button, Row, Col } from "antd";
import {
    DollarCircleOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import { nftData } from "../data/nft.data";
import MyModalMakeRequest from "../components/Modal/MyModalMakeRequest"
import "./css/Market.css";
const settings = {
    apiKey: "-C7_ur_4s6R0oUnBNGi4qB3XWfv-HsFR",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
const { Meta } = Card;

const Market = () => {
    const [NFTInfo, SetNFTInfo] = useState([]);
    const [isLoading, SetIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [currentNftAddress, setCurrentNftAddress] = useState("")
    const showModal = (address) => {
        setIsModalOpen(true);
        setCurrentNftAddress(address);

    };

    const hanleSubmit = async () => {
        setModalLoading(true)

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModalLoading(false)

    };
    useEffect(() => {
        const GetContractMetadata = async () => {
            // var res = [];
            const data = await Promise.all(nftData.map(nft => alchemy.nft.getContractMetadata(
                nft.webAddress
            ))) || [];
            SetNFTInfo(data);
            SetIsLoading(false);
        };
        if (isLoading) {
            GetContractMetadata();
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
                                showModal(nftData?.address)
                            }}
                        >
                            <DollarCircleOutlined />
                            Borrow
                        </Button>
                    </Card>
                </li>
            ))}
            <MyModalMakeRequest data={{isModalOpen, setIsModalOpen, handleCancel, currentNftAddress}}>
            </MyModalMakeRequest>
        </ul>
    );
};

export default Market;
