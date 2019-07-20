/*
 * 路由权限配置页面
 * @Date: 2019-07-18 10:33:21
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: ['/order/list'],
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
        if(props.location.pathname != state.pathname) {
            return {
                pathname: props.location.pathname,
                selectedKeys: [props.location.pathname]
            };
        }
        return state;
    }

    render() {
        const { selectedKeys } = this.state;
        return (
            <Menu
                theme="dark"
                mode="inline"
                defaultOpenKeys={['/order/list']}
                selectedKeys={selectedKeys}
                onClick={({ key }) => {
                    this.props.history.push(key);
                    this.setState({ selectedKeys: [key] });
                }}
            >
                <Menu.Item key="/order/list">
                    <Icon type="shopping-cart" />
                    <span>
                        订单管理
                    </span>
                </Menu.Item>
                {/* <Menu.Item key="/chart">
                    <Icon type="shopping-cart" />
                    <span>
                        订单管理
                    </span>
                </Menu.Item> */}
                <Menu.Item key="/add/goods">
                    <Icon type="shopping" />
                    <span>
                        添加商品
                    </span>
                </Menu.Item>
            </Menu>
        );
    }
}

export default withRouter(Index);
