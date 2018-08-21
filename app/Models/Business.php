<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
  /**
   * Get the projects belonging to this business
   */
  public function projects() {
    return $this->hasMany('App\Models\Project');
  }
}
