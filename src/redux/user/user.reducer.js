import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};
// bc in the first render we don't have state (it's undefined)
// is state is ever undefined (it's not set) then it would fall back & leverage the initial state value that we passed
// null is considered a valid value

// whenever an action fires, store passess the state(the current state when the actions get fired) to this reducer
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
