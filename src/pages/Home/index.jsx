import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Link, Route, Redirect, withRouter, Router } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import LayoutHeader from '../../components/LayoutHeader/index';
import LayoutSider from '../../components/LayoutSider/index';
import AsyncCompnent from '../../components/AsyncComponent/index';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import Table from '../../pages/Table/index';
import Chart from '../../pages/Chart/index';
import routeConfig from '../../routeConfig';
import * as homeApi from '../../servers/home.jsx';
import * as action from '../../actions/Home';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

const history = createBrowserHistory();

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
            selectedKeys: ['table']
        };
    }

    render() {
        const { increase, home: { isLoading } } = this.props;
        const { selectedKeys } = this.state;
        return (
            <Router history={history}>
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
                            defaultOpenKeys={['sub1']}
                            selectedKeys={selectedKeys}
                            onClick={({ key }) => this.setState({ selectedKeys: [key] })}
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
                                <Menu.Item key="table">
                                    <Link to='/table'>表格</Link>
                                </Menu.Item>
                                <Menu.Item key="chart">
                                    <Link to='/chart'>图表</Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ marginLeft: 200 }}>
                        <Header>
                            <LayoutHeader />
                        </Header>
                        <Content className="home-content">
                            {routeConfig}
                            <Redirect from={"*"} to={'/home'} />
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
