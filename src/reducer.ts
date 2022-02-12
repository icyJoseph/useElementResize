export function reducer<State = unknown>(
  state: State,
  newState: Partial<State>
): State {
  return {
    ...state,
    ...newState
  };
}
