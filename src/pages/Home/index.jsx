import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import * as action from '../../actions/Home';
import './index.less';

const mapStateToProps = state => {
    const { home } = state;
    return {
        count: home.count
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increase: (...args) => dispatch(action.increase(...args)),
        decrease: (...args) => dispatch(action.decrease(...args))
    }
}
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { increase, decrease, count } = this.props;
        return (
            <section>
                <div>计数：{count}</div>
                <Button type="primary" onClick={increase.bind(this, count)}>增加</Button>
                <Button type="primary" onClick={decrease.bind(this, count)}>减少</Button>
            </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
