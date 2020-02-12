import { SET_TYPE_FILTER, Filters } from '../actions/ui_actions';
import { updateState } from "./reducer_helpers";
import { store } from '../_store';


export default function(state = store.bucketUi, action) {

    switch (action.type) {
        case SET_TYPE_FILTER:
            return updateState(state, {
                typeFilter: action.filter,
            });

        default: return state;
    }
}