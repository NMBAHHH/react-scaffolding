import React, { Component } from 'react';
import { Button, Select, Form, Input } from 'antd';

const colWidth = 150;
const { Option } = Select;

class orderListSearch extends Component {
    constructor(props) {
        super(props);
    }


    // 表单校验
    fieldDecorator = () => {
        const { form } = this.props;
        const formProps = {
            // 订单编号
            orderId: form.getFieldDecorator('orderId'),
            // 客户名称
            customerName: form.getFieldDecorator('customerName'),
            // 下单方式
            placeOrder: form.getFieldDecorator('placeOrder')
        };
        return formProps;
    }

    // 表单提交
    handleSubmit = (e) => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFields((err) => {
            console.log(err);
            // if (!err) {

            // }
        });
    }

    render() {
        const formProps = this.fieldDecorator();
        return (
            <section className="order-list-search">
                <article>
                    <Form layout="inline">
                        <Form.Item label="订单编号">
                            {
                                formProps.orderId(
                                    <Input placeholder="请输入订单编号" style={{ width: colWidth }} />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="客户名称">
                            {
                                formProps.customerName(
                                    <Input placeholder="请输入客户名称" style={{ width: colWidth }} />
                                )
                            }
                        </Form.Item>
                        <Form.Item label="下单方式">
                            {
                                formProps.placeOrder(
                                    <Select
                                        allowClear
                                        style={{ width: colWidth }}
                                        placeholder="请选择下单方式"
                                    >
                                        <Option value={1}>自主下单</Option>
                                        <Option value={2}>代下单</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </Form>
                </article>
                <article className="button">
                    <Button
                        onClick={this.handleSubmit}
                        type="primary"
                    >
                        搜索
                    </Button>
                </article>
            </section>
        );
    }
}

const orderListSearchForm = Form.create({
    name: 'orderListSearch'
})(orderListSearch);

export default orderListSearchForm;