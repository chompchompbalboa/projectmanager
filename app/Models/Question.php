<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class Question extends Model
{
  // Define which attributes will be visible
  protected $visible = ['id', 'data', 'type'];

  // Build custom attributes
  protected $appends = ['data', 'type'];

  public function getTypeAttribute() {
    return "QUESTION";
  }

  public function getDataAttribute() {
    $author = $this->author()->first();
    return [
      "author" => [
        "id" => $author->id,
        "name" => $author->name,
      ],
      "to" => User::find($this->to),
      "question" => $this->question,
      "answer" => $this->answer,
      "createdAt" => $this->created_at->toDateTimeString(),
    ];
  }

  public function author() {
    return $this->belongsTo('App\Models\User', 'from');
  }
}
