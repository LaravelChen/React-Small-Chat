import React, {Component} from 'react';
import NavBar from './compoents/Main/NavBar';
import './resources/css/bulma.css';
import './resources/css/App.css';

// import Footer from './compoents/Main/Footer';
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

export default App;
