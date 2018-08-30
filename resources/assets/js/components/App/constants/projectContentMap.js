//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import ProjectActivity from '../ProjectActivity'
import ProjectCalendar from '../ProjectCalendar'
import ProjectHours from '../ProjectHours'
import ProjectFiles from '../ProjectFiles'
import ProjectPurchasing from '../ProjectPurchasing';
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
  PURCHASING: {
    text: "Purchasing",
    component: ProjectPurchasing
  }
}