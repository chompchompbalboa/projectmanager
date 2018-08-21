//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import ProjectDesign from '../ProjectDesign'
import ProjectFiles from '../ProjectFiles'
import ProjectTimeline from '../ProjectTimeline'
import ProjectFinances from '../ProjectFinances';
import ProjectPurchasing from '../ProjectPurchasing';
//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------
export default {
  TO_DO: {
    text: "To Do",
    component: ProjectDesign
  },
  FILES: {
    text: "Files",
    component: ProjectFiles
  },
  PURCHASES: {
    text: "Purchases",
    component: ProjectPurchasing
  },
  TIMELINE: {
    text: "Timeline",
    component: ProjectTimeline
  }
}