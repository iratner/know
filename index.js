import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/init_redux';

import { FoodApp } from './src/containers';

class Food extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            store: null
        }
    }

    componentDidMount() {
        this.setState({ store : createStore(reducers, /* some json/javascript object */)});
    }

    render() {
        const { store } = this.state;

        return store
                ? (
                    <div>
                        <h1>Food is {this.props.name}</h1>
                        <h2>Production? {process.env.NODE_ENV}</h2>
                        <FoodApp/>
                    </div>
                ) : <div>Whoops</div>
            ;


    }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<Food name="Food" />, mountNode);