import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/init_redux";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Reactathon } from "./src";
import { covidData, Fetcher } from "./src/Fetcher";
import { setCovidData } from "./redux/actions/data_actions";
import memoizeOne from "memoize-one";


/**
 * This bootstrapping method should work for many backend-driven, multi-view,
 * applications.  The Fetcher component will take a request and a map of arguments.  This
 * means that the request function, which will be called from within the Fetcher
 * Component, needs to accept a map as well.  Otherwise, this mechanism wlll fail.
 * Additionally, if there is no need to re-fetch data when parameters are the same from
 * one request to the next, we memoize the function when we pass it into the Fetcher.
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      store: null,
      country: "Iran"
    };

    this.initialStore = {
      data: {
        goals: ["learn about useEffect"],
      },
    };
  }

  componentDidMount() {
    this.setState({
      store: createStore(
        reducers,
        this.initialStore,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      ),
    });
  }

  render() {
    const { store, country } = this.state;

    return store ? (
      <Provider store={store}>
        <input onChange={e => this.setState({country: e.target.value})}/>
        <Router>
          <div style={{display: "flex", flexDirection: "column"}}>
            <Link to={'/reactathon'}>
              reactathon
            </Link>
            <Link to={'/another-place'}>another place</Link>
            <Switch>
              <Route path={'/another-place'}><span>Another place</span></Route>
              <Route path={"/reactathon"}>
                <Fetcher
                  request={memoizeOne(covidData)}
                  args={{ country }}
                  dispatch={setCovidData}
                >
                  <Reactathon />
                </Fetcher>
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    ) : (
      <div>Whoops</div>
    );
  }
}

const mountNode = document.getElementById("app");
ReactDOM.render(<App name="Food" />, mountNode);
