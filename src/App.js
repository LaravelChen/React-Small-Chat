import React, {Component} from 'react';
import NavBar from './compoents/Main/NavBar';
import './resources/css/bulma.css';
import './resources/css/App.css';
import {bindActionCreators} from "redux";
import * as IndexAction from "./actions/IndexActions";
import {connect} from "react-redux";
import store from "./stores";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <NavBar></NavBar>
                {this.props.children}
            </div>
        );
    }
}

export default connect((state, props) => ({}), dispatch => ({
    indexAction: bindActionCreators(IndexAction, dispatch),
}))(App);