<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     * @var array
     */
    protected $hidden = [
      'created_at', 'employer', 'password', 'remember_token', 'updated_at'
    ];

    /**
     * Get the business the user belongs to
     */
    public function business() {
      return $this->belongsTo('App\Models\Business');
    }

    /**
    * Get the projects the user has access to
    */
    public function projects() {
      $employer = $this->business()->first();
      return $employer->projects()->get();
    }
    
}
