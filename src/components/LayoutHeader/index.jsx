import React, { Component } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import * as styles from './index.less';

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href={false}>
                退出
            </a>
        </Menu.Item>
    </Menu>
);

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className={styles.layoutHeader}>
                <div className={styles.headerLeft}>
                    订单系统
                </div>
                <div className={styles.headerRight}>
                    <span className={styles.message}>消息</span>
                    <Dropdown className={styles.dropDown} overlay={menu}>
                        <div>
                            <Avatar className={styles.avatar} size={28} icon="user" />
                            <span className={styles.name}>Faker</span>
                        </div>
                    </Dropdown>
                </div>
            </section>
        );
    }
}

export default Index;
