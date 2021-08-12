import React, { Component } from "react";

export default class ErrorBoundry extends Component {
    state = {
        error: false,
    };

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    render() {
        if (this.state.error) {
            return <div>Произошла ошибка</div>;
        }

        return this.props.children;
    }
}
