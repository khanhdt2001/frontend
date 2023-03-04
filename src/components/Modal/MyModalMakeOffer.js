import React, { useEffect, useState } from "react";
import { Modal, Image, Input, Button, Form } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./MyModalMakeOffer.css";
import { alchemy, convertIpfs } from "../../function/Function";
const MyModalMakeOffer = (props) => {
    const {
        isModalOpen,
        setIsModalOpen,
        handleCancel,
        currentDataLocal,
        currentDataWeb,
    } = props.data;
    const [form] = Form.useForm();
    const [pay1time, setPay1time] = useState()
    const [payAllTime, setPayAllTime] = useState()
    const myModalClose = () => {
        handleCancel();
        form.resetFields();
        setPay1time(0)
        setPayAllTime(0)
    };
    const onOk = () => {
        form.submit();
    };
    const onFinish = (values) => {
        // console.log('Success:', values);
    };
    const onChangeInput = () => {
        const offerAmount = form.getFieldValue("Offer amount");
        const rate = form.getFieldValue("Rate");
        const days = form.getFieldValue("Days")
        const numberOfPayment = form.getFieldValue("Number of payment")
        console.log("offerAmount", offerAmount);
        console.log("rate", rate);
        console.log("days", days);
        console.log("number of payment", numberOfPayment);
        const payOneTime = 
        setPay1time(payOneTime)

    };
    return (
        <Modal
            title="Make Offer"
            open={isModalOpen || false}
            onCancel={myModalClose}
            onOk={onOk}
        >
            <div className="offer-container">
                <div className="request-information">
                    <Image
                        width={200}
                        height={200}
                        src={convertIpfs(currentDataWeb.rawMetadata.image)}
                    />
                    <div className="request-information-result">
                        <p className="">Pay 1 time:</p>
                        <p className="">Pay all time:</p>
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
