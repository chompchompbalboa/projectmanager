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
    return [
      "author" => $this->author()->first(),
      "createdAt" => $this->created_at->toDateTimeString(),
      "date" => $this->date,
      "description" => $this->description
    ];
  }

  public function author() {
    return $this->belongsTo('App\Models\User', 'user_id');
  }
}
