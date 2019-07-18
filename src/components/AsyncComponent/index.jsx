import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
            this.IsMounted = true;
        }

        async componentDidMount() {
            const { default: component } = await importComponent();
            if(this.IsMounted) {
                this.setState({
                    component: component
                });
            }
        }

        componentWillUnmount() {
            this.IsMounted = false;
        }

        render() {
            const Component = this.state.component;
            return Component ? <Component {...this.props} />: null;
        }
    }

    return AsyncComponent;
}