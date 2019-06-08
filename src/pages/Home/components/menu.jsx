import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ['/table'],
            // 当前页面路径
            pathname: ''
        };
    }

    componentDidMount() {
        const { location: { pathname } } = this.props;
        this.setState({
            selectedKeys: [pathname],
            pathname
        });
    }

    static getDerivedStateFromProps(props, state) {
        if(props.location.pathname == '/home') {
            return {
                pathname: '/table',
                selectedKeys: ['/table']
            }
        }
        if(props.location.pathname != state.pathname) {
            return {
                pathname: props.location.pathname,
                selectedKeys: [props.location.pathname]
            }
        }
        return state;
    }

    render() {
        const { selectedKeys } = this.state;
        return (
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
                    <Menu.Item key="/table">
                        <Link to='/table'>表格</Link>
                    </Menu.Item>
                    <Menu.Item key="/chart">
                        <Link to='/chart'>图表</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default withRouter(Index);
