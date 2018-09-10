//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { arrayOf, bool, shape, string } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import date from './config/date'

import projectActivityMap from './maps/projectActivityMap'

import ProjectContentContainer from './ProjectContentContainer'
import ProjectActivityHeader from './ProjectActivityHeader'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectActivity extends Component {

  state = {
    hiddenTypes: [
      "DATE"
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
      typeof(activeProject.data[typeSettings.dataKey]) !== "undefined"
      ? activeProject.data[typeSettings.dataKey].slice()
      : []
    ) // Copy the current data array for the type being added or initialize it with an empty array if it doesn't exist
    nextActiveProjectArrayForTheTypeBeingAdded.push({
      type: typeBeingAdded,
      id: null,
      data: newItemData,
      editable: true
    }) // Push the new item to the data array
    updateProject("data." + typeSettings.dataKey, nextActiveProjectArrayForTheTypeBeingAdded)
  }

  isItemEditable = (data, editable, user) => {
    if (editable || user.id === data.author.id) {
      return true
    }
    return false
  }

  isItemTypeHidden = (type) => {
    const {
      hiddenTypes
    } = this.state
    return _.indexOf(hiddenTypes, type) === -1
  }

  toggleFilterOption = (option) => {
    const {
      hiddenTypes
    } = this.state
    let nextHideTypes =_.clone(hiddenTypes)
    // If the type is currently visible, turn it off
    if(!this.isItemTypeHidden(option) && nextHideTypes.length > 0) {
      nextHideTypes = _.pull(nextHideTypes, option)
    }
    // If it's off, turn it on
    else {
      nextHideTypes.push(option)
    }
    this.setState({
      hiddenTypes: nextHideTypes
    })
  }
  
  render() {
    const { 
      isActiveTab, 
      activeProject, 
      updateProject, 
      user 
    } = this.props
    const {
      hiddenTypes
    } = this.state
    return (
      <ProjectContentContainer 
        isActiveTab={isActiveTab}>
        <ProjectActivityHeader
          activeProject={activeProject}
          addToActivityList={this.addToActivityList}
          hiddenTypes={hiddenTypes}
          toggleFilterOption={this.toggleFilterOption}
          updateProject={updateProject}
          user={user}/>
        {this.activityList().map((timelineItem, index) => {
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
                key: index,
                id: id,
                data: data,
                editable: this.isItemEditable(data, editable, user),
                updateKey: updateKey,
                updateProject: updateProject,
                user: user
              }
            )
          }
        })}
      </ProjectContentContainer>
    )
  }
}