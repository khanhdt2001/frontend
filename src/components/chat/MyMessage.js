import React from "react";
import { AddressContext } from "../../context/MyContext";
import { myShortString } from "../../function/Function";
import {
   Image,
   Card,
   Avatar,
   Tooltip,
   Row,
   Col,
   Button,
   notification,
   Steps,
   theme,
   Result,
} from "antd";
import "./MyChat.css";
const MyMessage = ({ message }) => {
   const { currentAddress } = React.useContext(AddressContext);
   const msgClass =
      message.name === currentAddress ? `sent_address` : `received_address`;
   return (
      <div className={`${msgClass} message`}>
         {currentAddress !== message.name ? (
            <p className="user_name">{myShortString(message.name, 10)}</p>
         ) : (
            <></>
         )}
         <p>{message.text}</p>
      </div>
   );
};

export default MyMessage;
