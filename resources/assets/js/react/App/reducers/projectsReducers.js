const defaultState = null

const projects = (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_PROJECTS_STORE':
      return action.nextStore
    default:
      return state
  }
}

export default projects