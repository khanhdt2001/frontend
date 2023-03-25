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
} from "antd";
import checked from "../assets/picture/check.png";

import { AddressContext } from "../context/MyContext";
import {
    alchemy,
    convertIpfs,
    convertToEth,
    convertToDay,
} from "../function/Function";
import axios from "axios";
import "./css/MyOffer.css";
const { Meta } = Card;
const MyOffer = () => {
    const { currentAddress } = React.useContext(AddressContext);
    const [isLoading, SetIsLoading] = useState(true);
    const [metadata, setMetadata] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getOffers = async () => {
            await axios({
                method: "get",
                url: `http://localhost:5000/offer/8/${page}/${currentAddress}`,
            }).then(
                async (response) => {
                    setData(response.data);
                    console.log(response.data);
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
    return (
        <div className="offers_container">
            <div className="offers_container_info">
                <Image
                    width={200}
                    // src={convertIpfs(metadata[0]?.rawMetadata.image)}
                />
                <div className="nft-detail-script">
                    <p className="">Lendor: </p>
                    <p className="">Pay 1 time: eth</p>
                    <p className="">Pay all time: eth</p>
                </div>
            </div>
            <div className="nft-detail-offer">
                <ul>
                    {data?.offers?.map((data, index) => (
                        <li className="nft-detail-li" key={data._id}>
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
                                    <Col>
                                        {" "}
                                        ETH:{" "}
                                        {convertToEth(data.offerTokenAmount)}
                                    </Col>
                                    <Col> Rate: {data.offerTokenRate}</Col>
                                    <Col>
                                        {" "}
                                        Days:{" "}
                                        {convertToDay(data.offerAmountOfTime)}
                                    </Col>
                                    <Col>Pay Time: {data.offerPayTime} </Col>
                                </Row>
                                {data?.checked == true ? (
                                    <Meta 
                                        className="offers_container_checked"
                                        avatar={
                                            <Avatar size={24} src={checked} />
                                        }
                                    />
                                ) : (
                                    <></>
                                )}

                                <Button
                                    size="large"
                                    type="primary"
                                    className="li_btn"
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

export default MyOffer;
