<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
  // Define which attributes will be visible
  protected $visible = ['id', 'data', 'type'];

  // Build custom attributes
  protected $appends = ['data', 'type'];

  public function getTypeAttribute() {
    return "MILESTONE";
  }

  public function getDataAttribute() {
    return [
      "name" => $this->name,
      "description" => $this->description,
      "date" => $this->date,
      "createdAt" => $this->created_at->toDateTimeString(),
    ];
  }

  public function author() {
    return $this->belongsTo('App\Models\User', 'user_id');
  }
}
