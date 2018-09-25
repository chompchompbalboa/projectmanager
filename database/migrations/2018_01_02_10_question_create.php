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
          $table->unsignedInteger('from');
          $table->unsignedInteger('to');
          $table->text('question');
          $table->text('answer')->nullable();
          $table->timestamps();

          $table->foreign('project_id')->references('id')->on('projects');
          $table->foreign('from')->references('id')->on('users');
          $table->foreign('to')->references('id')->on('users');
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
