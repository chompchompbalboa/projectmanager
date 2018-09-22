<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class QuestionCreate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
          $table->increments('id');
          $table->unsignedInteger('project_id');
          $table->unsignedInteger('user_id');
          $table->text('question');
          $table->text('answer')->nullable();
          $table->timestamps();

          $table->foreign('project_id')->references('id')->on('projects');
          $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
