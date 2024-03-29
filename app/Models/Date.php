<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Date extends Model
{
  // Define which attributes will be visible
  protected $visible = ['id', 'data', 'type'];

  // Build custom attributes
  protected $appends = ['data', 'type'];

  public function getTypeAttribute() {
    return "DATE";
  }

  public function getDataAttribute() {
    $department = $this->department()->first();
    return [
      "department" => $department->id,
      "name" => $this->name,
      "description" => $this->description,
      "start" => $this->start,
      "end" => $this->end,
      "color" => $department->color,
      "createdAt" => $this->created_at->toDateTimeString(),
    ];
  }

  public function author() {
    return $this->belongsTo('App\Models\User', 'user_id');
  }

  public function department() {
    return $this->belongsTo('App\Models\Department', 'department_id');
  }
}
