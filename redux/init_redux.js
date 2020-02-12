import { combineReducers } from 'redux';
import * as reducers from "./reducers";

/*
    bucketData and bucketUi are also used as data keys in the base store defined in _store.js

    combinedReduces creates a state shape based on the data keys passed into
    the combineReducers object
 */
export default combineReducers(reducers);