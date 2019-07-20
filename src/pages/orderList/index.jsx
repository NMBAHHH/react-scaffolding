import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { withRouter } from 'react-router';
import * as action from '../../actions/table';
import OrderListSearch from './component/orderListSearch';
import orderTable from './component/orderTable';
import './index.less';

const mapStateToProps = state => {
    const { table } = state;
    return {
        table: table.toJS()
    };
};

const mapDispatchToProps = (dispatch) => ({
    getTable: (...args) => dispatch(action.getTable(...args))
});

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 表格数据
            tableData: []
        };
    }

    componentDidMount() {
        const { getTable } = this.props;
        getTable();
    }

    static getDerivedStateFromProps(props, state) {
        const { table: { tableData } } = props;
        if (tableData.code == 500) {
            message.error(tableData.error, 3);
            return state;
        }

        return {
            tableData
        };
    }

    render() {
        const { tableData: { listData, isLoading } } = this.state;
        return (
            <section>
                <OrderListSearch />
                <orderTable listData={listData} isLoading={isLoading} />
            </section>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));