import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Pagination, Card } from "antd";
import { alchemy, convertIpfs, vendorMakeRequest } from "../function/Function";
import "./css/requests.css"
const { Search } = Input;
const { Meta } = Card;
const Request = () => {
    const [isLoading, SetIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState([])
    const [keySearch, setKeySearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const onSearch = (value) => {
        setKeySearch(value);
        console.log(value);
    };
    useEffect(() => {
        const GetRequests = async () => {
            await axios({
                method: "get",
                url: `http://192.168.1.59:5000/receipt/8/${page}`,
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
                    setMetadata(result)
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
                                cover={
                                    <img
                                        alt="example"
                                        src={convertIpfs(metadata[index]?.rawMetadata.image)}
                                    />
                                }
                            >
                                {/* <Meta
                                    title={metadata[index]?.contract.openSea.collectionName}
                                    description={"TokenId: " + metadata[index]?.tokenId +""}
                                /> */}
                                
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="request-footer">
                <Pagination defaultCurrent={1} pageSize={8} total={total} />
            </div>
        </div>
    );
};

export default Request;
