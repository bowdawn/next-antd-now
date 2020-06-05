import React, { useState } from 'react';
import {
    Form,
    Input,

    Select,

    Button,
    Row, Col

} from 'antd';


const { Option } = Select;



export default function RegistrationForm() {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };
    return (
        <Row style={{ height: "100%" }} justify="center" align="middle">
            <Col>

                <Form

                    form={form}
                    name="register"
                    onFinish={onFinish}
                    style={{ maxWidth: 300 }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        labelCol={{ span: 24 }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        labelCol={{ span: 24 }}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item >
                        <Row justify="center">
                            <Col>
                                <Button type="primary" htmlType="submit">
                                    Register
                        </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};