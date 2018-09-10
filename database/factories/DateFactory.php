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

$factory->define(App\Models\Date::class, function (Faker $faker) {
    return [
        'department_id' => App\Models\Department::all()->random()->id,
        'project_id' => App\Models\Project::all()->random()->id,
        'user_id' => App\Models\User::all()->random()->id,
        'name' => $faker->sentence(2),
        'description' => $faker->paragraph($nbSentences = 4, $variableNbSentences = true),
        'start' => $faker->dateTimeBetween($startDate = '-300 days', $endDate = 'now', $timezone = null),
        'end' => $faker->dateTimeBetween($startDate = 'now', $endDate = '+300 days', $timezone = null),
    ];
});