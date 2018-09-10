const defaultState = null

const business = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_BUSINESS_STORE':
      return action.nextStore
    default:
      return state
  }
}

export default business