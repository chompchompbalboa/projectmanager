<?php

use Illuminate\Database\Seeder;

class UpdateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      factory(App\Models\Update::class, 20000)->create();
    }
}
