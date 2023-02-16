import React from "react";
import "./Header.css";

import { Row, Col } from "antd";

import { WalletOutlined, FireOutlined } from "@ant-design/icons";
import { Button } from "antd";
const Header = () => {
   return (
      <Row className="my-header-row">
         <Col span={3} style={{ backgroundColor: "red" }}>
            <Row justify={"center"} className="my-header-logo">
               <FireOutlined style={{ fontSize: "30px" }} />
               Ezio
            </Row>
         </Col>
         <Col span={3} offset={18}>
            <Row justify={"center"}>
               <Button
                  type="primary"
                  icon={<WalletOutlined style={{ fontSize: "20px" }} />}
               >
                  Connect wallet
               </Button>
            </Row>
         </Col>
      </Row>
   );
};

export default Header;
