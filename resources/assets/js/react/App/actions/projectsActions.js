export const deleteProjectData = (projectIndex, dataType, id) => ({
  type: 'DELETE_PROJECT_DATA',
  projectIndex: projectIndex,
  dataType: dataType,
  id: id
})

export const setProjectsStore = (nextStore) => ({
  type: 'SET_PROJECTS_STORE',
  nextStore: nextStore
})

export const updateProject = (projectIndex, key, value) => ({
  type: 'UPDATE_PROJECT',
  projectIndex: projectIndex,
  key: key,
  value: value
})