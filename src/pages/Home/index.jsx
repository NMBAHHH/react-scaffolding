import React, { Component, Suspense } from 'react';
import {
    Switch,
    Redirect,
    Router
} from 'react-router-dom';
import { Layout } from 'antd';
import { createHashHistory } from 'history';
import LayoutHeader from '../../components/LayoutHeader/index';
import Menu from './components/menu';
import routeConfig from '../../routeConfig';
import './index.less';

const { Header, Content, Sider } = Layout;

const history = createHashHistory();

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <Router history={history}>
                <Layout className="home-layout">
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            left: 0
                        }}
                        theme="light"
                    >
                        <div className="logo" />
                        <Menu />
                    </Sider>
                    <Layout>
                        <Header className="header">
                            <LayoutHeader />
                        </Header>
                        <Content className="home-content">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    {routeConfig}
                                    <Redirect
                                        from="/*"
                                        to="/dashboard"
                                    />
                                </Switch>
                            </Suspense>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default Index;
