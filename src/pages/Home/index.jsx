import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import * as homeApi from '../../servers/home.jsx';
import * as action from '../../actions/Home';
import './index.less';

const mapStateToProps = state => {
    const { home } = state;
    return {
        home
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

    test = () => {
        const { getCard } = this.props;
        getCard();
    }

    render() {
        const { increase, home: { isLoading } } = this.props;
        return (
            <section>
                <Button
                    type="primary"
                    onClick={increase}
                    loading={isLoading}
                >
                    增加
                </Button>
            </section>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
