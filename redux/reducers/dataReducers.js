import {ADD_GOAL, SET_COVID_DATA} from "../actions/data_actions";
import { store } from '../_store';
import { updateState } from "./reducer_helpers";
import update from "immutability-helper";

export default function( state = store.data, action) {

    switch (action.type) {
        case ADD_GOAL:
            console.log("Adding a goal in reducer");
            return updateState(state, {
                goals: [...state.goals, action.goal]
            });

        case SET_COVID_DATA:
            return updateState(state, {
                countryData: action.data
            });

        default: return state;
    }
}