import React, { Component } from 'react';
import {
    Switch,
    Link,
    Route,
    Redirect,
    Router
} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import LayoutHeader from '../../components/LayoutHeader/index';
import LayoutSider from '../../components/LayoutSider/index';
import { createBrowserHistory } from 'history';
import Table from '../../pages/Table/index';
import Chart from '../../pages/Chart/index';
import routeConfig from '../../routeConfig';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

const history = createBrowserHistory();

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ['table']
        };
    }

    render() {
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
                            <Switch>
                                {routeConfig}
                                <Redirect from="/*" to="/home" />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default Index;
