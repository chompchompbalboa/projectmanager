<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Business extends Model
{
  // Define which attributes will be visible
  protected $visible = ['id', 'employees', 'name'];

  // Build custom attributes
  protected $appends = ['employees'];

  public function getEmployeesAttribute() {
    return $this->employees()->get();
  }

  public function employees() {
    return $this->hasMany('App\Models\User');
  }

  public function projects() {
    return $this->hasMany('App\Models\Project');
  }
}
