import React, { Component } from 'react';
import {
    Switch,
    Link,
    Route,
    Redirect,
    Router
} from 'react-router-dom';
import { Layout, Icon } from 'antd';
import { createBrowserHistory } from 'history';
import LayoutHeader from '../../components/LayoutHeader/index';
import LayoutSider from '../../components/LayoutSider/index';
import Menu from './components/menu';
import Table from '../Table/index';
import Chart from '../Chart/index';
import routeConfig from '../../routeConfig';
import './index.less';

const { Header, Content, Footer, Sider } = Layout;

const history = createBrowserHistory();

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <Router history={history}>
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0
                        }}
                    >
                        <div className="logo" />
                        <Menu />
                    </Sider>
                    <Layout style={{ marginLeft: 200 }}>
                        <Header>
                            <LayoutHeader />
                        </Header>
                        <Content className="home-content">
                            <Switch>
                                {routeConfig}
                                <Redirect
                                    from="/*"
                                    to="/home"
                                />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default Index;
