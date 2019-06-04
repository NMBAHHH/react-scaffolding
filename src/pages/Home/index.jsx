import React, { Component } from 'react';
import { Button } from 'antd';
import * as action from '../../actions/HomeAction';
import './index.less';

const mapStateToProps = state => {
    return state;
};
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section>
                <Button type="primary">Primary</Button>
            </section>
        );
    }
}

export default Index;
