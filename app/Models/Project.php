<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  protected $appends = ['data', 'tabs'];
  
  /**
   * Get all the tabs this project wants to use. This will be customizable in
   * in the future, but for now let's set a default value every project will
   * use
   */
  public function getTabsAttribute() {
    return [
      ["id" => "ACTIVITY"],
      ["id" => "CALENDAR"],
      ["id" => "PARTS"],
      ["id" => "PURCHASING"],
      ["id" => "HOURS"],
      ["id" => "FILES"]
    ];
  }

  /**
   * Organize the project's data into a single attribute that the front end
   * can easily pass around and digest from
   */
  public function getDataAttribute() {
    return [
      "DATE" => $this->dates()->get(),
      "MILESTONE" => $this->milestones()->get(),
      "NOTE" => $this->notes()->get(),
    ];
  }

  /**
   * Get all the dates that belong to this project
   */
  public function dates() {
    return $this->hasMany('App\Models\Date');
  }

  /**
   * Get all the milestones that belong to this project
   */
  public function milestones() {
    return $this->hasMany('App\Models\Milestone');
  }

  /**
   * Get all the notes that belong to this project
   */
  public function notes() {
    return $this->hasMany('App\Models\Note');
  }
}
