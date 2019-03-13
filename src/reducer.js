export const initialState = { width: 0, height: 0, running: false };
export const reducer = (state, newState) => ({ ...state, ...newState });
