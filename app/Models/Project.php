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
      ["id" => "TIMELINE"],
      ["id" => "TO_DO"],
      ["id" => "FILES"],
      ["id" => "PURCHASES"]
    ];
  }

  /**
   * Organize the project's data into a single attribute that the front end
   * can easily pass around and digest from
   */
  public function getDataAttribute() {
    return [
      "notes" => $this->notes()->get()
    ];
  }

  /**
   * Get all the notes that belong to this project
   */
  public function notes() {
    return $this->hasMany('App\Models\Note');
  }
}
