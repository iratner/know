import React, { useState, useEffect } from "react";
import {connect, useDispatch} from "react-redux";
// import { ErrorPage, Loading } from "../components";
// import { AppConstants } from "../constants/AppConstants";
import PropTypes from "prop-types";
import memoizeOne from "memoize-one";

export const covidData = async ({ country }) => {
  const response = await fetch(
    `https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${country}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
        "x-rapidapi-key": "d951b526d1msh49787179a527ac1p160915jsnda2ec33ae508",
      },
    }
  );

  return response.json();
};

export class FetcherBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: false,
      error: false
    }
  }

  async componentDidMount() {
    const {request, args, action, dispatch} = this.props;

    this.setState({loading: true});

    request(args)
      .then(data => {
        this.setState({data});
        dispatch(action(data));
      })
      .catch(error => {
        this.setState({error})
      })
      .finally(() => {
        this.setState({loading: false});
      });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {

    // First check to see if the state has changed
    const { data, loading, error } = this.state;
    if (data !== nextState.data || loading !== nextState.loading || error !== nextState.error) return true;


    const {request, args, action, dispatch} = this.props;
    const oldArgs = Object.keys(args);
    const newArgs = Object.keys(nextProps.args);

    // Next check to see if the request function or the arguments to it have changed
    if (nextProps.request.name !== request.name) return true;
    else if (oldArgs.length !== newArgs.length) return true;
    else {
      let argKeysDontMatch = oldArgs.some(arg => !newArgs.includes(arg));

      if (!argKeysDontMatch) {
        let argValuesDontMatch = false;

        for (let argKey in args) {
          if (argValuesDontMatch) continue;
          argKeysDontMatch = args[argKey] != nextProps.args[argKey];
        }

        return argValuesDontMatch;
      }
      return argKeysDontMatch;
    }
  }

  render() {
    const {data, loading, error} = this.state;
    const { conditionalPassthru, children } = this.props;

    if (loading) {
      return (
        <div style={{ width: "100%", height: "100%" }} className="gw-flex-center">
          {/*<Loading />*/}
          <div>Loading</div>
        </div>
      );
    }

    if (error) {
      return <div>Error</div>;
      // return <ErrorPage message={errorMessage} />;
    }
    if (!data) {
      return <span>no data yet</span>;
    }
    if (conditionalPassthru) {
      return children(conditionalPassthru(data));
    }

    return children;
  }
}

export const Fetcher = connect()(FetcherBase);

Fetcher.propTypes = {
  request: PropTypes.func.isRequired,
  args: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  conditionalPassthru: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
}

Fetcher.defaultProps = {
  // errorMessage: AppConstants.DEFAULT_ERROR_MESSAGE,
  errorMessage: "Something went wrong",
  conditionalPassthru: false
};

export class FetchObject {
  /**
   * @param {object} request
   * @param {object} action
   * @param {object} requestArgs
   * @param {string} actionKey
   * @param {object} conditionalPassthru
   */
  constructor(request, action, requestArgs, actionKey, conditionalPassthru = false) {
    this.request = request;
    this.requestArgs = requestArgs;
    this.action = action;
    this.actionKey = actionKey;
    this.conditionalPassthru = conditionalPassthru;
    this.conditionPassed = !conditionalPassthru;
  }

  checkIfPassed() {
    this.conditionPassed = this.conditionalPassthru();
  }
}

export const MultiFetcher = ({ fetchGroup, useRenderFunction = false, children }) => {
  if (fetchGroup.length === 0) return <>{useRenderFunction ? children() : children}</>;

  const make = (group, content) => {
    if (group.length) {
      let next = group.pop();
      return (
        <Fetcher
          args={next.requestArgs}
          request={memoizeOne(next.request)}
          action={next.action}
          acttionKey={next.actionKey}
          conditionalPassthru={next.conditionalPassthru}
        >
          {next.conditionalPassthru
            ? conditionPassed => (conditionPassed ? make(group, content) : content)
            : make(group, content)}
        </Fetcher>
      );
    } else return <>{useRenderFunction ? content() : content}</>;
  };

  return <>{make(fetchGroup, children)}</>;
};

MultiFetcher.propTypes = {
  fetchGroup: PropTypes.arrayOf(PropTypes.instanceOf(FetchObject))
};
