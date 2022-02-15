import { createSelector } from "reselect";

const selectUser = (state) => state.login;

export const selectCurrentUser = createSelector([selectUser], (user) => user);
