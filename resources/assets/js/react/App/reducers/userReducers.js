const defaultState = null

const user = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_USER_STORE':
      return action.nextStore
    default:
      return state
  }
}

export default user