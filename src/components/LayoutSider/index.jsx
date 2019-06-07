import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Button } from 'antd';
import './index.less';

const { SubMenu } = Menu;

class LayoutSider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    render() {
        const { collapsed } = this.state;
        return (
            <div>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    inlineCollapsed={collapsed}
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
                        <Menu.Item key="1">表格</Menu.Item>
                        <Menu.Item key="2">图表</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="menu" />
                                <span>Navigation 2</span>
                            </span>
                        }
                    >
                        <Menu.Item key="3">Option 3</Menu.Item>
                        <Menu.Item key="4">Option 4</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default LayoutSider;
