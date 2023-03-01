import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Pagination, Card } from "antd";
import { alchemy, convertIpfs } from "../function/Function";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MyModalMakeOffer from "../components/Modal/MyModalMakeOffer";
import "./css/requests.css";
const { Search } = Input;
const { Meta } = Card;
const Request = () => {
    const [isLoading, SetIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [keySearch, setKeySearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onSearch = (value) => {
        setKeySearch(value);
        console.log(value);
        showModal()
    };
    const showModal = () => {
        setIsModalOpen(true);

    };

    const handleCancel = () => {
        setIsModalOpen(false);

    };
    const handleOnclick = (data) => {
        console.log(data);
        setIsModalOpen(true)
        // navigate(`/requests/${data.receiptNumber}`)
    };
    useEffect(() => {
        const GetRequests = async () => {
            await axios({
                method: "get",
                url: `http://localhost:5000/receipt/8/${page}`,
            }).then(
                async (response) => {
                    setData(response.data);
                    setTotal(response.data.total);
                    console.log(response.data);
                    const result = await Promise.all(
                        response.data.receipts.map((item, index) =>
                            alchemy.nft.getNftMetadata(
                                response.data.webAddress[index].webAddress,
                                item.tokenId
                            )
                        )
                    );
                    setMetadata(result);
                    console.log(result);

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
            <div className="request-search">
                <Search
                    placeholder="Request"
                    allowClear
                    onSearch={onSearch}
                    style={{
                        width: 304,
                    }}
                    enterButton
                />
            </div>
            <div className="request-body">
                <ul className="request__list">
                    {data?.receipts?.map((receipt, index) => (
                        <li key={receipt.receiptNumber}>
                            <Card
                                hoverable
                                style={{ width: 220 }}
                                onClick={() => {
                                    handleOnclick(data.receipts[index]);
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
                                            {metadata[index]?.contract.name}
                                            #{metadata[index]?.tokenId}
                                        </p>
                                    </div>
                                    <div className="request-info-meta-bottom">
                                        Offers:
                                    </div>
                                </div>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="request-footer">
                <Pagination defaultCurrent={1} pageSize={8} total={total} />
            </div>
            <MyModalMakeOffer
                data={{
                    isModalOpen,
                    setIsModalOpen,
                    handleCancel,
                }}
            ></MyModalMakeOffer>
        </div>
    );
};

export default Request;
