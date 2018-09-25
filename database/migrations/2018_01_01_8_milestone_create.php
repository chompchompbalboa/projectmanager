<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MilestoneCreate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('milestones', function (Blueprint $table) {
          $table->increments('id');
          $table->unsignedInteger('project_id');
          $table->unsignedInteger('user_id');
          $table->string('name');
          $table->text('description');
          $table->dateTime('date');
          $table->timestamps();

          $table->foreign('user_id')->references('id')->on('users');
          $table->foreign('project_id')->references('id')->on('projects');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('milestones');
    }
}
