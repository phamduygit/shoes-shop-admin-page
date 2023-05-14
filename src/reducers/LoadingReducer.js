function loadingReducer(state = { isFinish: true }, action) {
  switch (action.type) {
    case 'START_LOADING':
      return { isFinish: false }
    case 'END_LOADING':
      return { isFinish: true }
    default:
      return state
  }
}

export default loadingReducer;