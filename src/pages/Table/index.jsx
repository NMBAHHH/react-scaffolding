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

        // 选择框选中的值
        this.selectValue = '';
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

    // 搜索
    search = () => {
        const { getTable } = this.props;
        let datas = {
            selectValue: this.selectValue
        };
        getTable(datas);
    }

    render() {
        const { tableData, tableData: { listData, isLoading } } = this.state;
        return (
            <main>
                <section className="table-select">
                    <Select
                        placeholder="全部"
                        style={{ width: 120 }}
                        onChange={(value) => this.selectValue = value}
                        allowClear
                    >
                        <Option value={1}>John</Option>
                        <Option value={2}>Jim</Option>
                        <Option value={3}>Joe</Option>
                    </Select>
                    <article className="table-search">
                        <Button
                            type="primary"
                            onClick={this.search}
                        >
                            搜索test
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