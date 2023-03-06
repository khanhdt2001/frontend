import React, { useEffect, useState } from "react";
import { Modal, Image, Input, Button, Form, notification } from "antd";
import axios from "axios";
import {
   InfoCircleOutlined,
   SmileOutlined,
   MehOutlined,
} from "@ant-design/icons";
import "./MyModalMakeOffer.css";
import {
   convertIpfs,
   lenderMakeOffer,
   cutStringErr,
   convertToEth,
   convertToDay,
} from "../../function/Function";
import { AddressContext } from "../../context/MyContext";
const MyModalMakeOffer = (props) => {
   const {
      isModalOpen,
      handleCancel,
      currentDataLocal,
      SetIsLoading,
      currentDataWeb,
   } = props.data;
   const { currentAddress } = React.useContext(AddressContext);
   const [receipt, setReceipt] = useState([]);
   const [form] = Form.useForm();
   const [pay1time, setPay1time] = useState();
   const [payAllTime, setPayAllTime] = useState();
   const [loading, setLoading] = useState(false);
   const [disableSubmit, setDisableSubmit] = useState(false);
   const [api, contextHolder] = notification.useNotification();
   useEffect(() => {
      const getData = async () => {
         await axios({
            method: "get",
            url: `http://localhost:5000/receipt/${currentDataLocal?.receiptNumber}`,
         }).then(
            async (response) => {
               console.log(response.data);
               setReceipt(response.data);
            },
            (error) => {
               console.log(error);
            }
         );
      };
      if (isModalOpen) {
         getData();
      }
   }, [isModalOpen]);
   const myModalClose = () => {
      handleCancel();
      form.resetFields();
      setPay1time(0);
      setPayAllTime(0);
      setDisableSubmit(false);
   };
   const onOk = () => {
      form.submit();
   };
   const onFinish = async () => {
      setLoading(true);
      const offerAmount = form.getFieldValue("Offer amount");
      const rate = form.getFieldValue("Rate");
      const days = form.getFieldValue("Days");
      const numberOfPayment = form.getFieldValue("Number of payment");
      try {
         const result = await lenderMakeOffer(
            currentDataLocal.receiptNumber,
            rate,
            days,
            numberOfPayment,
            offerAmount,
            currentAddress
         );
         setTimeout(() => {
            openNotification("Tnx success", result.transactionHash);
            setLoading(false);
            SetIsLoading(true);
            setDisableSubmit(true);
         }, 3000);
      } catch (error) {
         setTimeout(() => {
            setLoading(false);
            SetIsLoading(true);
            setDisableSubmit(true);
            openNotification("Tnx fail", cutStringErr(error.message));
         }, 3000);
      }
   };
   const openNotification = (msg, des) => {
      api.open({
         message: msg,
         description: des,
         duration: 0,
         icon:
            msg === "Tnx success" ? (
               <SmileOutlined
                  style={{
                     color: "#108ee9",
                  }}
               />
            ) : (
               <MehOutlined
                  style={{
                     color: "red",
                  }}
               />
            ),
      });
   };
   const onChangeInput = () => {
      const offerAmount = form.getFieldValue("Offer amount");
      const rate = form.getFieldValue("Rate");
      const numberOfPayment = form.getFieldValue("Number of payment");

      const interest = (offerAmount * rate) / 100 / numberOfPayment;
      const payOneTime = offerAmount / numberOfPayment + interest;
      setPay1time(payOneTime);
      setPayAllTime(payOneTime * numberOfPayment);
   };
   return (
      <Modal
         title="Make Offer"
         open={isModalOpen || false}
         onCancel={myModalClose}
         footer={[
            <Button key="back" onClick={myModalClose}>
               Cancel
            </Button>,

            <Button
               key="submit"
               type="primary"
               loading={loading}
               onClick={onOk}
               disabled={disableSubmit}
            >
               Submit
            </Button>,
         ]}
      >
         {contextHolder}
         <div className="offer-container">
            <div className="offer-information">
               <Image
                  width={200}
                  height={200}
                  src={convertIpfs(currentDataWeb?.rawMetadata.image)}
               />
               <div className="offer-information-result">
                  <p className="">Pay 1 time: {pay1time || 0} eth</p>
                  <p className="">Result: {payAllTime || 0} eth</p>
               </div>
               <div className="offer-list">
                  <ul>
                     {receipt?.offers?.map((data) => (
                        <li className="" key={data.offerNumber}>
                           {"Rate: "}
                           {data.offerTokenRate}
                           {", "}
                           {convertToEth(data.offerTokenAmount)}
                           {" ETH, "}
                           {convertToDay(data.offerAmountOfTime)}
                           {" Days"}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <Form
               form={form}
               layout="vertical"
               onFinish={onFinish}
               className="request-form"
            >
               <Form.Item
                  label="Offer amount"
                  name="Offer amount"
                  className="request-form-item"
                  tooltip={{
                     title: "Eth willing to offer",
                     icon: <InfoCircleOutlined />,
                  }}
                  rules={[
                     {
                        required: true,
                     },
                  ]}
               >
                  <Input
                     type={"number"}
                     placeholder="Eg: 1,2"
                     onChange={onChangeInput}
                  />
               </Form.Item>
               <Form.Item
                  label="Rate"
                  name="Rate"
                  className="request-form-item"
                  tooltip={{
                     title: "Percent",
                     icon: <InfoCircleOutlined />,
                  }}
                  rules={[
                     {
                        required: true,
                     },
                  ]}
               >
                  <Input
                     type={"number"}
                     placeholder="Eg: 1,2"
                     onChange={onChangeInput}
                  />
               </Form.Item>
               <Form.Item
                  label="Days"
                  name="Days"
                  className="request-form-item"
                  tooltip={{
                     title: "How many days you willing to rent",
                     icon: <InfoCircleOutlined />,
                  }}
                  rules={[
                     {
                        required: true,
                     },
                  ]}
               >
                  <Input
                     type={"number"}
                     min={7}
                     max={30}
                     placeholder="Eg: 10"
                     onChange={onChangeInput}
                  />
               </Form.Item>
               <Form.Item
                  label="Number of payment"
                  name="Number of payment"
                  className="request-form-item"
                  tooltip={{
                     title: "How many days you willing to rent",
                     icon: <InfoCircleOutlined />,
                  }}
                  rules={[
                     {
                        required: true,
                     },
                  ]}
               >
                  <Input
                     type={"number"}
                     min={1}
                     max={4}
                     placeholder="Eg: 10"
                     onChange={onChangeInput}
                  />
               </Form.Item>
            </Form>
         </div>
      </Modal>
   );
};

export default MyModalMakeOffer;
