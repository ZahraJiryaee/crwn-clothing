// functions that return object
// each object is in the correct format that the action is expected to be

export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});
