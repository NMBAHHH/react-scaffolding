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
import * as styles from './index.less';

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
                <Layout className={styles.homeLayout}>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            left: 0
                        }}
                        theme="light"
                    >
                        <div className={styles.logo} />
                        <Menu />
                    </Sider>
                    <Layout>
                        <Header className={styles.header}>
                            <LayoutHeader />
                        </Header>
                        <Content className={styles.homeContent}>
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
