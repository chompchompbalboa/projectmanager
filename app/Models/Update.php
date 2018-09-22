<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Update extends Model
{
  // Define which attributes will be visible
  protected $visible = ['id', 'data', 'type'];

  // Build custom attributes
  protected $appends = ['data', 'type'];

  public function getTypeAttribute() {
    return "UPDATE";
  }

  public function getDataAttribute() {
    $author = $this->author()->first();
    return [
      "author" => [
        "id" => $author->id,
        "name" => $author->name,
      ],
      "text" => $this->text,
      "createdAt" => $this->created_at->toDateTimeString(),
    ];
  }

  public function author() {
    return $this->belongsTo('App\Models\User', 'user_id');
  }
}
