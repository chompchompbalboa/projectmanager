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

$factory->define(App\Models\Department::class, function (Faker $faker) {
    return [
        'business_id' => App\Models\Business::all()->random()->id,
        'name' => $faker->streetName,
        'description' => $faker->paragraph($nbSentences = 4, $variableNbSentences = true),
        'color' => $faker->rgbCssColor,
    ];
});