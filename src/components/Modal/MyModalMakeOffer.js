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
const { ethereum } = window;

const MyModalMakeOffer = (props) => {
   const {
      isModalOpen,
      handleCancel,
      currentDataLocal,
      SetIsLoading,
      currentDataWeb,
   } = props.data;
   console.log("currentDataWeb", currentDataWeb);
   const { currentAddress, loginMetaMask } = React.useContext(AddressContext);
   const [receipt, setReceipt] = useState([]);
   const [form] = Form.useForm();
   const [pay1time, setPay1time] = useState();
   const [payAllTime, setPayAllTime] = useState();
   const [loading, setLoading] = useState(false);
   const [disableSubmit, setDisableSubmit] = useState(false);
   const [api, contextHolder] = notification.useNotification();
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
   useEffect(() => {
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
      var addressData;
      if (!currentAddress) {
         const listAccount = await ethereum.request({
            method: "eth_requestAccounts",
         });
         addressData = listAccount[0];
         await loginMetaMask(addressData);
      }
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
            addressData || currentAddress
         );
         setTimeout(async () => {
            openNotification("Tnx success", result.transactionHash);
            setLoading(false);
            SetIsLoading(true);
            setDisableSubmit(true);
            await getData();
         }, 3000);
      } catch (error) {
         setTimeout(() => {
            setLoading(false);
            SetIsLoading(true);
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
                  List offers:
                  <ul>
                     {receipt?.offers?.map((data) => (
                        <li className="" key={data.offerNumber}>
                           {"Rate: "}
                           {data.offerTokenRate}
                           {", "}
                           {convertToEth(data.offerTokenAmount)}
                           {" ETH, "}
                           {convertToDay(data.offerAmountOfTime)}
                           {" Days, "}
                           {data.offerPayTime}
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
                     {
                        validator: (rule, value) => {
                           if (
                              value <
                              currentDataWeb.contract.openSea.floorPrice / 3
                           ) {
                              return Promise.reject(
                                 `Value must be at least ${
                                    currentDataWeb.contract.openSea.floorPrice /
                                    3
                                 } eth`
                              );
                           }
                           return Promise.resolve();
                        },
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
                     {
                        validator: (rule, value) => {
                           if (value > 22) {
                              return Promise.reject(
                                 `Rate must not be greater than 22%`
                              );
                           }
                           return Promise.resolve();
                        },
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
                     {
                        validator: (rule, value) => {
                           if (value > 29 || value < 7) {
                              return Promise.reject(
                                 `Days must be in between 7 days and 29 days`
                              );
                           }
                           return Promise.resolve();
                        },
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
                     {
                        validator: (rule, value) => {
                           const days = form.getFieldValue("Days");

                           if ((days/value) < 7) {
                              return Promise.reject(
                                 `Invalid number of payment`
                              );
                           }
                           return Promise.resolve();
                        },
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
