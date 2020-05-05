import { reselect } from "reselect";

export const getGoals = state => {
  console.log("Selector called");
  return state.data.goals
};
