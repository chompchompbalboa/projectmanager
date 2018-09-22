<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Models\Question::class, function (Faker $faker) {
    return [
        'project_id' => App\Models\Project::all()->random()->id,
        'user_id' => App\Models\User::all()->random()->id,
        'question' => $faker->paragraph($nbSentences = 3, $variableNbSentences = true),
        'answer' => $faker->paragraph($nbSentences = 3, $variableNbSentences = true)
    ];
});
