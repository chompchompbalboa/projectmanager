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

$factory->define(App\Models\Employee::class, function (Faker $faker) {
    return [
        'user_id' => App\Models\User::all()->random()->id,
        'business_id' => App\Models\Business::all()->random()->id
    ];
});
