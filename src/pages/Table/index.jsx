import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { withRouter } from 'react-router';
import { Table, Button, message, Select } from 'antd';
import * as tableApi from '../../servers/table';
import * as action from '../../actions/table';
import './index.less';

const history = createBrowserHistory();

const { Option } = Select;

const mapStateToProps = state => {
    const { table } = state;
    return {
        table: table.toJS()
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTable: (...args) => dispatch(action.getTable(...args))
    }
}

// 表格列配置
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
        if(tableData.code == 500) {
            message.error(tableData.error, 3);
            return state;
        }

        return {
            tableData,
        }
    }

    render() {
        const { tableData, tableData: { listData, isLoading } } = this.state;
        return (
            <main>
                <section className="table-select">
                    <Select defaultValue="lucy" style={{ width: 120 }}>
                        <Option value="jack">Jack</Option>
                    </Select>
                    <article className="table-search">
                        <Button type="primary">
                            搜索
                        </Button>
                    </article>
                </section>
                <Table
                    columns={columns}
                    dataSource={listData ? listData : []}
                    loading={isLoading}
                />
            </main>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));