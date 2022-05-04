import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};
// bc in the first render we don't have state (it's undefined)
// is state is ever undefined (it's not set) then it would fall back & leverage the initial state value that we passed
// null is considered a valid value

// whenever an action fires, store passess the state(the current state when the actions get fired) to this reducer
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };

    case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
    case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
