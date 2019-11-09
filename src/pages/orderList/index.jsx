import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { withRouter } from 'react-router';
import * as action from '../../actions/orderList';
import OrderListSearch from './component/orderListSearch';
import OrderTable from './component/orderTable';
import { isEmpty } from '../../utils/index';
import * as styles from './index.less';

const mapStateToProps = state => {
    const { orderList, actionType } = state;
    return {
        orderList: orderList.toJS(),
        actionType
    };
};

const mapDispatchToProps = (dispatch) => ({
    getTable: (...args) => dispatch(action.getTable(...args)),
    getTableTest: (...args) => dispatch(action.getTableTest(...args))
});

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderListData: {
                isLoading: true
            }
        };
    }

    componentDidMount() {
        const { getTable, getTableTest } = this.props;
        getTable();
        getTableTest(123);
    }

    componentDidUpdate() {
        const { orderList, actionType } = this.props;
        const { orderListData } = orderList;
        // 获取表格信息成功
        if(!isEmpty(orderListData) && orderListData.code == 200 && actionType == 'getTable') {
            this.setState({
                orderListData
            });
        }

        // 获取表格信息失败
        if(!isEmpty(orderListData) && orderListData.code && orderListData.code != 200 && actionType == 'getTable') {
            message.error('获取表格信息失败');
        }

        this.props.actionType = '';
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 浅层对比
        if(JSON.stringify(nextProps) == JSON.stringify(this.props) && JSON.stringify(nextState) == JSON.stringify(this.state)) {
            return false;
        }
        return true;
    }

    render() {
        const { orderListData: { listData, isLoading } } = this.state;
        return (
            <section className={styles.orderList}>
                <OrderListSearch />
                <OrderTable listData={listData} isLoading={isLoading} />
            </section>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));