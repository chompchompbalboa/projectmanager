//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import ProjectNote from '../ProjectNote'
import ProjectTodo from '../ProjectTodo'
//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------
export default {
  NOTE: {
    component: ProjectNote,
    text: "Note",
    dataKey: "notes",
    data: {
      note: ""
    }
  },
  TO_DO: {
    component: ProjectTodo,
    text: "To Do",
    dataKey: "todos",
    data: {
      todo: ""
    }
  },
}