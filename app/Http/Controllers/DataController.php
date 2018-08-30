<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Date;
use App\Models\Note;
use App\Models\Project;

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
      'projects' => $this->user->projects()
    ];
  }

  /**
   * Save data recieved from the front end
   */
  public function saveData(Request $request)
  {
    switch($request->type) {      
    case "DATE":
      if(is_null($request->id)) {
        $date = new Date;
      }
      else {
        $date = Date::find($request->id);
      }
      if(!is_null($date)) {
        $date->date = $request->data['date'];
        $date->description = $request->data['description'];
        $date->project_id = $request->data['project']['id'];
        $date->user_id = $request->data['author']['id'];
        $date->created_at = $request->data['createdAt'];
        if ($date->save()) {
          return [
            "success" => true,
            "project" => Project::find($date->project_id)
          ];
        }
      }
      return [
        "success" => false,
        "project" => Project::find($request['project']['id'])
      ];
    break;

      case "NOTE":
        if(is_null($request->id)) {
          $note = new Note;
        }
        else {
          $note = Note::find($request->id);
        }
        if(!is_null($note)) {
          $note->note = $request->data['note'];
          $note->project_id = $request->data['project']['id'];
          $note->user_id = $request->data['author']['id'];
          $note->created_at = $request->data['createdAt'];
          if ($note->save()) {
            return [
              "success" => true,
              "project" => Project::find($note->project_id)
            ];
          }
        }
        return [
          "success" => false,
          "project" => Project::find($request['project']['id'])
        ];
      break;
    }
  }
}
