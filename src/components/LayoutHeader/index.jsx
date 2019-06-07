import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.less';
const mapStateToProps = state => {
    return {
        state
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increase: (...args) => dispatch(action.increase(...args))
    }
}
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="header-name">
                测试系统
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
