<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
  // Define which attributes will be visible
  protected $visible = ['data', 'type'];

  // Build custom attributes
  protected $appends = ['data', 'type'];

  public function getTypeAttribute() {
    return "NOTE";
  }

  public function getDataAttribute() {
    return [
      "author" => $this->author()->first(),
      "createdAt" => $this->created_at->toDateTimeString(),
      "note" => $this->note
    ];
  }

  public function author() {
    return $this->belongsTo('App\Models\User', 'user_id');
  }
}
