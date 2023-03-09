import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { useLocation } from "react-router-dom";
import "./css/NftDetail.css";
const NftDetail = () => {
    const location = useLocation();
    console.log(location.pathname);

    return (
        <div className="nft-detail">
            <div className="nft-detail-info">
                <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <div className="nft-detail-script">
                    <p className="">Pay 1 time: 0 eth</p>
                    <p className="">Result: 0 eth</p>
                </div>
            </div>
            <div className="nft-detail-offer"></div>
        </div>
    );
};

export default NftDetail;
