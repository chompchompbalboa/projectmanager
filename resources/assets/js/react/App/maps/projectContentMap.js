//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import ProjectActivity from '../ProjectActivity'
import ProjectCalendar from '../ProjectCalendar'
import ProjectHours from '../ProjectHours'
import ProjectFiles from '../ProjectFiles'
import ProjectParts from '../ProjectParts'
import ProjectPurchasing from '../ProjectPurchasing'
//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------
export default {
  ACTIVITY: {
    text: "Activity",
    component: ProjectActivity
  },
  CALENDAR: {
    text: "Calendar",
    component: ProjectCalendar
  },
  HOURS: {
    text: "Hours",
    component: ProjectHours
  },
  FILES: {
    text: "Files",
    component: ProjectFiles
  },
  PARTS: {
    text: "Parts",
    component: ProjectParts
  },
  PURCHASING: {
    text: "Purchasing",
    component: ProjectPurchasing
  }
}