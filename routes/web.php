<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth'])->group(function() {

  // App
  Route::get('/app', function () {
    return view('app');
  });

  // Initial Data
  Route::get('/app/initial-data', 'DataController@buildInitialData');

  // Delete Data
  Route::delete('/app/delete', 'DataController@deleteData');

  // Save Data
  Route::put('/app/save', 'DataController@saveData');
});

Route::get('/', function () {
    return view('website');
});

Auth::routes();
