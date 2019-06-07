import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import LayoutHeader from '../../components/LayoutHeader/index';
import LayoutSider from '../../components/LayoutSider/index';
import RouteConfig from '../../router';
import Table from '../../pages/Table/index';
import Chart from '../../pages/Chart/index';
import * as homeApi from '../../servers/home.jsx';
import * as action from '../../actions/Home';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

const mapStateToProps = state => {
    const { home } = state;
    return {
        home
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increase: (...args) => dispatch(action.increase(...args))
    }
}
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ['1']
        };
    }

    render() {
        const { increase, home: { isLoading } } = this.props;
        const { selectedKeys } = this.state;
        return (
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={selectedKeys}
                        onClick={({ key }) => this.setState({selectedKeys: [key]})}
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="menu" />
                                    <span>Navigation 1</span>
                                </span>
                            }
                        >
                            <Menu.Item key="1">
                                表格
                            </Menu.Item>
                            <Menu.Item key="2">
                                图表
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header>
                        <LayoutHeader />
                    </Header>
                    <Content className="home-content">
                        {
                            selectedKeys == '1' ? <Table /> : <Chart />
                        }
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
