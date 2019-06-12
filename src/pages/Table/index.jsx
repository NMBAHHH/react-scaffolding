import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
    Table,
    Button,
    message,
    Select
} from 'antd';
import * as action from '../../actions/table';
import './index.less';


const { Option } = Select;

const mapStateToProps = state => {
    const { table } = state;
    return {
        table: table.toJS()
    };
};

const mapDispatchToProps = (dispatch) => ({
    getTable: (...args) => dispatch(action.getTable(...args))
});

// 表格列配置
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a href="javascript:;">{text}</a>
    },
    {
        title: 'Age',
        dataIndex: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address'
    }
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
        if (tableData.code == 500) {
            message.error(tableData.error, 3);
            return state;
        }

        return {
            tableData
        };
    }

    // 搜索
    search = () => {
        const { getTable } = this.props;
        const datas = {
            selectValue: this.selectValue
        };
        getTable(datas);
    }

    render() {
        const { tableData: { listData, isLoading } } = this.state;
        return (
            <main>
                <section className="table-select">
                    <Select
                        allowClear
                        onChange={(value) => this.selectValue = value}
                        placeholder="全部"
                        style={{ width: 120 }}
                    >
                        <Option value={1}>John</Option>
                        <Option value={2}>Jim</Option>
                        <Option value={3}>Joe</Option>
                    </Select>
                    <article className="table-search">
                        <Button
                            onClick={this.search}
                            type="primary"
                        >
                            搜索
                        </Button>
                    </article>
                </section>
                <Table
                    columns={columns}
                    dataSource={listData || []}
                    loading={isLoading}
                />
            </main>
        );
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));