import React, { Component } from 'react';
import { Form, Button, Select, Input, InputNumber } from 'antd';
import config from '../../config';
import './index.less';

const { Option } = Select;

const selectWidth = 340;

class AddGoods extends Component {
    constructor(props) {
        super(props);
        this.state = { };
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

    // 表单校验
    fieldDecorator = () => {
        const { form } = this.props;
        const formProps = {
            // 商品名称
            goodsName: form.getFieldDecorator('goodsName', {
                rules: [
                    {
                        required: true,
                        message: '请输入商品名称'
                    }
                ]
            }),
            // 条形码
            barCode: form.getFieldDecorator('barCode', {
                rules: [
                    {
                        required: true,
                        message: '请输入条形码',
                        type: 'number'
                    }
                ]
            }),
            // 条形码
            inventory: form.getFieldDecorator('inventory'),
            // 商品标签
            goodsLabel: form.getFieldDecorator('goodsLabel')
        };
        return formProps;
    }

    render() {
        const formProps = this.fieldDecorator();
        return (
            <Form  className="phone-replenishing" style={{ width: 800 }} {...config.BASE_LAYOUT.GROD_COL} onSubmit={this.handleSubmit}>
                <Form.Item label="商品名称">
                    {
                        formProps.goodsName(
                            <Input style={{ width: selectWidth }} placeholder="请输入商品名称" />
                        )
                    }
                </Form.Item>
                <Form.Item label="条形码">
                    {
                        formProps.barCode(
                            <Input style={{ width: selectWidth }} placeholder="请输入条形码" />
                        )
                    }
                </Form.Item>
                <Form.Item label="库存量">
                    {
                        formProps.inventory(
                            <InputNumber style={{ width: selectWidth }} />
                        )
                    }
                </Form.Item>
                <Form.Item label="商品标签">
                    {
                        formProps.goodsLabel(
                            <Select
                                allowClear
                                style={{ width: selectWidth }}
                                placeholder="请选择下单方式"
                            >
                                <Option value={1}>新品</Option>
                                <Option value={2}>数码</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button
                        className="submit"
                        type="primary"
                        htmlType="submit"
                    >
                        提交
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const AddGoodsForm = Form.create({
    name: 'AddGoods'
})(AddGoods);

export default AddGoodsForm;