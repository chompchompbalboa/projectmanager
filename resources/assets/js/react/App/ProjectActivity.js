//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { arrayOf, bool, shape, string } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import date from './config/date'
import layout from './config/layout'

import projectActivityMap from './maps/projectActivityMap'

import AppContentRightColumnContent from './AppContentRightColumnContent'
import ProjectActivityAddAndFilter from './ProjectActivityAddAndFilter'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectActivity extends Component {

  state = {
    focusedTile: null,
    hiddenTypes: [
    ]
  }

  activityList = () => {
    const {
      activeProject
    } = this.props
    const {
      hiddenTypes
    } = this.state
    let activityList = []
    for (let type in activeProject.data) {
      if(_.indexOf(hiddenTypes, type) === -1) {
        activeProject.data[type].map((activityListItem, index) => {
          let pushItem = Object.assign({}, activityListItem)
          pushItem.updateKey = "data." + type + "." + index
          if (typeof pushItem.data.project === "undefined") {
            pushItem.data.project = {
              id: activeProject.id
            }
          }
          activityList.push(pushItem)
        })
      }
    }
    return _.orderBy(activityList, 'data.createdAt', 'desc')
  }

  addToActivityList = (typeBeingAdded) => {
    const {
      activeProject,
      activeProjectIndex,
      updateProject,
      user
    } = this.props
    const typeSettings = _.cloneDeep(projectActivityMap[typeBeingAdded]) // Get the settings for the current type being added
    let newItemData = typeSettings.data // Copy the default data settings for the new type we're adding
    newItemData.createdAt = date.format(new Date) // Set the createdAt time
    newItemData.author = user // Set the current user as the author
    newItemData.project = { 
      id: activeProject.id 
    } // Set the project id to the current project
    let nextActiveProjectArrayForTheTypeBeingAdded = (
      typeof(activeProject.data[typeBeingAdded]) !== "undefined"
      ? activeProject.data[typeBeingAdded].slice()
      : []
    ) // Copy the current data array for the type being added or initialize it with an empty array if it doesn't exist
    const newItemId = _.random(-5000, -1)
    nextActiveProjectArrayForTheTypeBeingAdded.push({
      type: typeBeingAdded,
      id: newItemId,
      data: newItemData,
      editable: true
    }) // Push the new item to the data array
    updateProject(activeProjectIndex, "data." + typeBeingAdded, nextActiveProjectArrayForTheTypeBeingAdded)
    if(this.isItemTypeHidden(typeBeingAdded)) {
      this.toggleTypeFilter(typeBeingAdded)
    }
    this.setState({
      focusedTile: typeBeingAdded + "-" + newItemId
    })
  }

  isItemEditable = (data, editable, user) => {
    if (editable) {
      return true
    }
    return false
  }

  isItemTypeHidden = (type) => {
    const {
      hiddenTypes
    } = this.state
    return _.indexOf(hiddenTypes, type) > -1
  }

  toggleTypeFilter = (type) => {
    const {
      hiddenTypes
    } = this.state
    let nextHideTypes =_.clone(hiddenTypes)
    // If the type is currently visible, turn it off
    if(this.isItemTypeHidden(type)) {
      nextHideTypes = _.pull(nextHideTypes, type)
    }
    // If it's off, turn it on
    else {
      nextHideTypes.push(type)
    }
    this.setState({
      hiddenTypes: nextHideTypes
    })
  }
  
  render() {
    const { 
      isActiveTab, 
      activeProject, 
      activeProjectIndex,
      updateProject, 
      user 
    } = this.props
    const {
      focusedTile,
      hiddenTypes
    } = this.state

    const activityList = this.activityList()
    const activityListLength = activityList.length

    return (
      <AppContentRightColumnContent 
        isActiveTab={isActiveTab}
        justifyContent="space-between">
        <ProjectActivityItems>
        {activityList.map((timelineItem, index) => {
          const {
            data,
            editable,
            id,
            type,
            updateKey
          } = timelineItem
          if(typeof projectActivityMap[type] !== "undefined") {
            return React.createElement(
              projectActivityMap[type].component,
              {
                key: type + "-" + id,
                id: id,
                activeProjectIndex: activeProjectIndex,
                data: data,
                isEditable: this.isItemEditable(data, editable, user),
                isFirst: index === 0,
                isFocused: type + "-" + id === focusedTile,
                isLast: index === activityListLength - 1,
                updateKey: updateKey,
                updateProject: updateProject,
                user: user
              }
            )
          }
        })}
        </ProjectActivityItems>
        <ProjectActivityControls>
          <ProjectActivityAddAndFilter
            activeProject={activeProject}
            addToActivityList={this.addToActivityList}
            hiddenTypes={hiddenTypes}
            toggleTypeFilter={this.toggleTypeFilter}
            updateProject={updateProject}
            user={user}/>
        </ProjectActivityControls>
      </AppContentRightColumnContent>
    )
  }
}

const ProjectActivityItems = styled.div`
  padding-right: calc(${layout.scrollbarWidth} + ${layout.project.containerPadding});
  width: calc(100% - 10vw + ${layout.scrollbarWidth});
  height: 100%;
  overflow-y: scroll;
`

const ProjectActivityControls = styled.div`
  position: sticky;
  top: 0;
  width: 10vw;
`