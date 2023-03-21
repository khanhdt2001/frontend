import React from "react";
import "./MyDrawer.css";
import { Button, Input, Statistic, Space } from "antd";
import CountUp from "react-countup";
const formatter = (value) => <CountUp end={value} separator="," />;
const { Search } = Input;
const MyDrawer = () => {
   return (
      <div className="my_drawer">
         <div className="my_drawer_balance">
            <Statistic title="My balance" value={100} formatter={formatter} />
         </div>
         <div className="my_drawer_input">
            <Space.Compact
               style={{
                  width: "100%",
               }}
            >
               <Input placeholder="Amount of eth want to withdraw" />
               <Button type="primary">Submit</Button>
            </Space.Compact>
         </div>
      </div>
   );
};

export default MyDrawer;
