import { combineReducers } from 'redux'
import business from './businessReducers'
import projects from './projectsReducers'
import user from './userReducers'

export default combineReducers({
  business: business,
  projects: projects,
  user: user
})