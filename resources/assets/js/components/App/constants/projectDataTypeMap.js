//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import ProjectDate from '../ProjectDate'
import ProjectNote from '../ProjectNote'

import dateConfig from '../config/date'
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
  DATE: {
    component: ProjectDate,
    text: "Date",
    dataKey: "date",
    data: {
      date: dateConfig.format(new Date),
      description: ""
    }
  },
}