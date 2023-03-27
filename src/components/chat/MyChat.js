import {
   addDoc,
   collection,
   onSnapshot,
   orderBy,
   query,
   serverTimestamp,
} from "firebase/firestore";
import { Button, Input, Space } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { AddressContext } from "../../context/MyContext";
import Send from "../../assets/picture/send-message_small.png";
import MyMessage from "./MyMessage";
import { db } from "../../function/Firebase";
import { async } from "@firebase/util";
const MyChat = () => {
   const [messages, setMessages] = useState([]);
   const [input, setInput] = useState();
   const { currentAddress } = React.useContext(AddressContext);
   const messageEl = useRef();


  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])
   useEffect(() => {
      const q = query(collection(db, "general"), orderBy("timestamp"));
      const unsubcribe = onSnapshot(q, (querySnapshot) => {
         let messages = [];
         querySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
         });
         setMessages(messages);
      });

      return () => unsubcribe();
   }, []);
   const sendMsg = async () => {
      if (input) {
         await addDoc(collection(db, "general"), {
            text: input,
            name: currentAddress,
            timestamp: serverTimestamp(),
         });
         setInput();
      }
   };

   return (
      <div className="main_message">
         <div className="main_text" ref={messageEl}>
            {messages &&
               messages.map((msg) => <MyMessage key={msg.id} message={msg} />)}
         </div>
         <Space.Compact
            className="send_msg_form"
            style={{
               width: "100%",
            }}
         >
            <Input
               value={input}
               placeholder="Send message"
               onPressEnter={sendMsg}
               onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={sendMsg} type="default">
               <img className="send_icon" src={Send} />
            </Button>
         </Space.Compact>
      </div>
   );
};

export default MyChat;
