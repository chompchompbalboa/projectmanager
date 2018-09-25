<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Date;
use App\Models\Project;
use App\Models\Question;
use App\Models\Update;

class DataController extends Controller
{

  public function __construct() { 
    // Assign the current user to the $this->user variable
    $this->middleware(function ($request, $next) {
      $this->user = Auth::user();
      return $next($request);
    });
  }

  /**
   * Return the initial data when a user visits the app
   */
  public function buildInitialData()
  {
    return [
      'user' => $this->user,
      'business' => $this->user->business()->first(),
      'projects' => $this->user->projects()
    ];
  }
}