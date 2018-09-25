//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import ProjectActivityQuestion from '../ProjectActivityQuestion'
import ProjectActivityUpdate from '../ProjectActivityUpdate'
//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------
export default {
  UPDATE: {
    component: ProjectActivityUpdate,
    text: "Update",
    data: {
      text: ""
    }
  },
  QUESTION: {
    component: ProjectActivityQuestion,
    text: "Question",
    data: {
      to: null,
      question: "",
      answer: ""
    }
  },
}