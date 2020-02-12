export const SET_TYPE_FILTER = "SET_TYPE_FILTER";
export const Filters = {
    PLACES: "PLACES",
    FOOD: "FOOD",
    ACTIVITIES: "ACTIVITIES"
};

export function setTypeFilter(filter) {
    return {
        type: SET_TYPE_FILTER,
        filter
    };
}