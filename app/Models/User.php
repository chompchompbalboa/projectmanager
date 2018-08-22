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
      'created_at', 'employers', 'password', 'remember_token', 'updated_at'
    ];

    /**
     * Get the businesses the user belongs to
     */
    public function employers() {
      return $this->belongsToMany('App\Models\Business', 'employees');
    }

    /**
    * Get the projects the user has access to
    */
    public function projects() {
      // NOTE: The employee table and model were built to allow a user to
      // belong to multiple business. That is also why we have the employers
      // function. However, right now we're only going to set it up so a user
      // belongs to a single business.
      $employer = $this->employers->first();
      return $employer->projects()->get();

    }
    
}
