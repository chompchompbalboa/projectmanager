<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Date;
use App\Models\Question;
use App\Models\Update;

class ProjectController extends Controller
{

  public function __construct() { 
    // Assign the current user to the $this->user variable
    $this->middleware(function ($request, $next) {
      $this->user = Auth::user();
      return $next($request);
    });
  }

  /**
   * Delete data
   */
  public function deleteData(Request $request)
  {
    switch($request->type) {  

      case "QUESTION":
        $question = Question::find($request->id);
        if(!is_null($question)) {
          if ($question->delete()) {
            return $this->deleteDataResponse(true);
          }
        }
        return $this->deleteDataResponse(false);
      break;

      case "UPDATE":
        $update = Update::find($request->id);
        if(!is_null($update)) {
          if ($update->delete()) {
            return $this->deleteDataResponse(true);
          }
        }
        return $this->deleteDataResponse(false);
      break;
    }
  }


  /**
   * Build the response object deleteData returns
   */
  private function deleteDataResponse(bool $success) 
  {
    return [
      "success" => $success
    ];
  }

  /**
   * Save data recieved from the front end
   */
  public function saveData(Request $request)
  {
    switch($request->type) {  

      case "QUESTION":
        if($request->id < 0) {
          $question = new Question;
        }
        else {
          $question = Question::find($request->id);
        }
        if(!is_null($question)) {
          $question->question = $request->data['question'];
          $question->answer = $request->data['answer'];
          $question->project_id = $request->data['project']['id'];
          $question->from = $request->data['author']['id'];
          $question->to = $request->data['to']['id'];
          $question->created_at = $request->data['createdAt'];
          if ($question->save()) {
            return $this->saveDataResponse(true, $question);
          }
        }
        return $this->saveDataResponse(false, $question);
      break;

      case "UPDATE":
        if($request->id < 0) {
          $update = new Update;
        }
        else {
          $update = Update::find($request->id);
        }
        if(!is_null($update)) {
          $update->text = $request->data['text'];
          $update->project_id = $request->data['project']['id'];
          $update->user_id = $request->data['author']['id'];
          $update->created_at = $request->data['createdAt'];
          if ($update->save()) {
            return $this->saveDataResponse(true, $update);
          }
        }
        return $this->saveDataResponse(false, $update);
      break;
    }
  }


  /**
   * Build the response object saveData returns
   */
  private function saveDataResponse(bool $success, $data) 
  {
    return [
      "success" => $success,
      "data" => $data
    ];
  }
}