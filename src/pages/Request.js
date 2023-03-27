import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Pagination, Card, Result } from "antd";
import { alchemy, convertIpfs } from "../function/Function";
import MyModalMakeOffer from "../components/Modal/MyModalMakeOffer";
import "./css/requests.css";
const { Search } = Input;
const { Meta } = Card;
const Request = () => {
    const [isLoading, SetIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDataLocal, setCurrentDataLocal] = useState();
    const [currentDataWeb, setCurrentDataWeb] = useState();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOnclick = (dataLocal, dataWeb) => {
        setCurrentDataLocal(dataLocal);
        setCurrentDataWeb(dataWeb);
        setIsModalOpen(true);
    };
    useEffect(() => {
        const GetRequests = async () => {
            await axios({
                method: "get",
                url: `http://localhost:5000/receipt/8/${page}`,
            }).then(
                async (response) => {
                    setData(response.data);
                    console.log(response.data);
                    setTotal(response.data.total);
                    const result = await Promise.all(
                        response.data.receipts.map((item, index) =>
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
                                    handleOnclick(
                                        data.receipts[index],
                                        metadata[index]
                                    );
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

            <MyModalMakeOffer
                data={{
                    isModalOpen,
                    handleCancel,
                    currentDataLocal,
                    SetIsLoading,
                    currentDataWeb,
                }}
            ></MyModalMakeOffer>
        </div>
    );
};

export default Request;
