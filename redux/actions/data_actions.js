export const ADD_BUCKET_LIST_ITEM = 'ADD_BUCKET_LIST_ITEM';
export const TOGGLE_COMPLETED = 'TOGGLE_COMPLETED';

export function addBucketListItem(item) {
    return {
        type: ADD_BUCKET_LIST_ITEM,
        item
    }
}

export function updateItem(id) {
    return {
        type: TOGGLE_COMPLETED,
        id
    }
}
