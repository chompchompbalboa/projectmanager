//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import ProjectDesign from '../components/ProjectDesign'
import ProjectFiles from '../components/ProjectFiles'
import ProjectTimeline from '../components/ProjectTimeline'
import ProjectFinances from '../components/ProjectFinances';
import ProjectPurchasing from '../components/ProjectPurchasing';
//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------
export default {
  DESIGN: {
    text: "Design",
    component: ProjectDesign
  },
  FILES: {
    text: "Files",
    component: ProjectFiles
  },
  FINANCES: {
    text: "Finances",
    component: ProjectFinances
  },
  PURCHASING: {
    text: "Purchasing",
    component: ProjectPurchasing
  },
  TIMELINE: {
    text: "Timeline",
    component: ProjectTimeline
  }
}