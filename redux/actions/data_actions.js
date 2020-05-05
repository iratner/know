export const ADD_GOAL = 'ADD_GOAL';
export const SET_COVID_DATA = 'SET_COVID_DATA';

export function addGoal(goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

export function setCovidData(data) {
    return {
        type: SET_COVID_DATA,
        data
    }
}
