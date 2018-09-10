//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import moment from 'moment'

import ProjectActivityNote from '../ProjectActivityNote'

import dateConfig from '../config/date'
//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------
export default {
  NOTE: {
    component: ProjectActivityNote,
    text: "Note",
    dataKey: "notes",
    data: {
      note: ""
    }
  },
}