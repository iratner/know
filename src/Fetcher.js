import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";


export const covidData = async ({country}) => {
  const response = await  fetch(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${country}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      "x-rapidapi-key": "d951b526d1msh49787179a527ac1p160915jsnda2ec33ae508"
    }
  });

  return response.json();
};

const useFetch = (request, args, dispatchFunc) => {
  const [requests, setRequests] = useState(null);

  const [data, setData] = useState(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  // console.log(request.arguments);

  useEffect(() => {
    setWorking(true);

    request(args).then( data => {
      setData(data);
      console.log(data.data)
      dispatch(dispatchFunc(data));
    }).catch( error => {
      setError(error);
    }).finally(() => {
      setWorking(false);
    })
  }, [request.name]);

  return [ data, working, error ];
};

export const Fetcher = ({request, args, dispatch, children}) => {

  const [ data, working, error ] = useFetch(request, args, dispatch);

  if (error) return <div>Error</div>;

  if (working) return <div>Working...</div>;

  return <div>{children}</div>;
};
