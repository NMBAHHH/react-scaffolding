import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { withRouter } from 'react-router';
import * as action from '../../actions/orderList';
import OrderListSearch from './component/orderListSearch';
import OrderTable from './component/orderTable';
import * as styles from './index.less';

const mapStateToProps = state => {
    const { orderList } = state;
    return {
        orderList: orderList.toJS()
    };
};

const mapDispatchToProps = (dispatch) => ({
    getTable: (...args) => dispatch(action.getTable(...args))
});

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderListData: []
        };
    }

    componentDidMount() {
        const { getTable } = this.props;
        getTable();
    }

    static getDerivedStateFromProps(props, state) {
        const { orderList: { orderListData } } = props;
        if (orderListData.code == 500) {
            message.error(orderListData.error, 3);
            return state;
        }

        return {
            orderListData
        };
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