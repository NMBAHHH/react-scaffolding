import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { withRouter } from 'react-router';
import { Table, Button } from 'antd';
import * as homeApi from '../../servers/home';
import * as action from '../../actions/Home';
import './index.less';

const history = createBrowserHistory();

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    },
];

const mapStateToProps = state => {
    const { home } = state;
    return {
        home: home.toJS()
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increase: (...args) => dispatch(action.increase(...args)),
        test2: (...args) => dispatch(action.test2(...args))
    }
}

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { increase, test2 } = this.props;
        console.log(this.props);
        return (
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                <Button onClick={() => {
                    this.props.history.push('/chart');
                }}>test</Button>
                <Button onClick={increase}>123</Button>
                <Button onClick={test2}>456</Button>
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));