import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Card, Tooltip, Avatar, Result } from "antd";
import { alchemy, convertIpfs } from "../function/Function";
import { AddressContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";
import makeBlockie from "ethereum-blockies-base64";
import checked from "../assets/picture/checked.png";
import "./css/myRequest.css";
const { Meta } = Card;
const MyRequest = () => {
    const [isLoading, SetIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const { currentAddress } = React.useContext(AddressContext);
    const handleOnclick = (receipt) => {
        console.log("receipt", receipt);
        navigate(`/receipt/${receipt.receiptNumber}`);
    };
    useEffect(() => {
        const GetRequests = async () => {
            await axios({
                method: "get",
                url: `http://localhost:5000/receipt/8/${page}/${currentAddress}`,
            }).then(
                async (response) => {
                    setData(response.data);
                    console.log(response.data);
                    setTotal(response.data.total);
                    const result = await Promise.all(
                        response.data.receipts.map((item) =>
                            alchemy.nft.getNftMetadata(
                                item.NFTAddress,
                                item.tokenId
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
            GetRequests();
        }
    }, [isLoading]);
    return (
        <div className="request-conatiner">
            <div className="request-body">
                <ul className="request__list">
                    {data?.receipts?.map((receipt, index) => (
                        <li key={receipt.receiptNumber}>
                            <Card
                                hoverable
                                style={{ width: 220 }}
                                onClick={() => {
                                    handleOnclick(receipt);
                                }}
                                cover={
                                    <img
                                        alt="example"
                                        src={convertIpfs(
                                            metadata[index]?.rawMetadata.image
                                        )}
                                    />
                                }
                            >
                                {
                                receipt?.lendor !==
                                    "0x0000000000000000000000000000000000000000" &&
                                receipt?.out === true ? (
                                    <Tooltip
                                        className="my_request_tooltip"
                                        title="Done"
                                    >
                                        <Meta
                                            avatar={
                                                <Avatar
                                                    size={47}
                                                    src={checked}
                                                />
                                            }
                                        />
                                    </Tooltip>
                                ) : (
                                    <>
                                        {receipt?.lendor !==
                                            "0x0000000000000000000000000000000000000000" &&
                                        receipt?.out === false ? (
                                            <Tooltip
                                                className="my_request_tooltip"
                                                title={receipt.lendor}
                                            >
                                                <Meta
                                                    avatar={
                                                        <Avatar
                                                            size={45}
                                                            src={makeBlockie(
                                                                receipt.lendor
                                                            )}
                                                        />
                                                    }
                                                />
                                            </Tooltip>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                )}
                                <div className="request-info-footer">
                                    <div className="request-info-meta-head">
                                        <p
                                            style={{
                                                display: "inline-flex",
                                                height: 0,
                                                lineHeight: 0,
                                                alignItems: "center",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {metadata[index]?.contract.name}#
                                            {metadata[index]?.tokenId}
                                        </p>
                                    </div>
                                    <div className="request-info-meta-bottom">
                                        Offers:{" "}
                                        {data?.offer[index].offer.length}
                                    </div>
                                </div>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
            {data?.receipts?.length === 0 ? (
                <Result
                    className="my_result_404"
                    status="404"
                    subTitle="Sorry, there are no requests at the moment."
                />
            ) : (
                <div className="request-footer">
                    <Pagination current={page} pageSize={8} total={total} />
                </div>
            )}
        </div>
    );
};

export default MyRequest;
