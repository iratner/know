import { ADD_BUCKET_LIST_ITEM, TOGGLE_COMPLETED } from "../actions/data_actions";
import { store } from '../_store';
import { updateState } from "./reducer_helpers";
import update from "immutability-helper";

export default function( state = store.bucketData, action) {

    switch (action.type) {
        case ADD_BUCKET_LIST_ITEM:
            return updateState(state, {
                bucketList: [
                    ...state.bucketList,
                    action.item.id
                ],
                bucketListById: {
                    ...state.bucketListById,
                    [action.item.id] : action.item
                }
            });

        case TOGGLE_COMPLETED:
            return update(state, {
                bucketListById: { [action.id]: { completed: { $apply: setting => !setting }}}
            });

        default: return state;
    }
}