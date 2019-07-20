import React from 'react';
import {
    Table
} from 'antd';

// 表格列配置
const columns = [
    {
        title: '订单编号',
        dataIndex: 'orderId',
        render: text => <a>{text}</a>
    },
    {
        title: '客户名称',
        dataIndex: 'customerName'
    },
    {
        title: '下单方式',
        dataIndex: 'placeOrder'
    },
    {
        title: '商品名称',
        dataIndex: 'goodsName'
    },
    {
        title: '价格',
        dataIndex: 'price'
    },
    {
        title: '下单时间',
        dataIndex: 'placeOrderTime'
    }
];

export default function orderList({ listData, isLoading }) {
    return (
        <Table
            columns={columns}
            dataSource={listData || []}
            loading={isLoading}
            rowKey="orderId"
        />
    );
}